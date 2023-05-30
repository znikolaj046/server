import { Product as ProductMapping } from './mapping.js'
import { ProductProp as ProductPropMapping } from './mapping.js'
import { ProductHydroschemes as ProductHydroschemesMapping } from './mapping.js'
import { ProductMaterials as ProductMaterialsMapping } from './mapping.js'
import { ProductPropValues as ProductPropValuesMapping } from './mapping.js'
import { Brand as BrandMapping } from './mapping.js'
import { Category as CategoryMapping } from './mapping.js'
import FileService from '../services/File.js'
import Translit from '../controllers/Translit.js'
import { Op } from 'sequelize'
import AppError from '../errors/AppError.js'

class Product {

    async getFilterProducts(filter) {
        const filter_array = filter.split('-or-')
        let out_filter = []
        let productIds = []

        filter_array.map(item => {
            const filter_element = item.split('-is-')
            let buff = new Buffer(filter_element[1], 'base64');
            filter_element[1] = buff.toString('utf-8');    

            let filter2 = {
                productPropId:{[Op.eq]: filter_element[0]}, 
                value:{[Op.eq]: filter_element[1]}
            }

            out_filter.push(filter2)
        })

        const where  = {[Op.or]: out_filter}

        const productIdsArray = await ProductPropValuesMapping.findAll({
            where
        })
        
        

        productIdsArray.map((item) => {
            productIds.push(item.dataValues.productId)
        })


        return productIds
    }

    async getAll(options) {
        const {categoryId, brandId, filter, limit, page, status} = options

        const offset = (page - 1) * limit
        const where = {}
        if (categoryId) where.categoryId = categoryId
        if (brandId) where.brandId = brandId
        where.status = status

        if (filter) {
            const where2 = await this.getFilterProducts(filter)
            console.log(where2)
            where.id = where2
        }

        const products = await ProductMapping.findAndCountAll({
            where, 
            limit, 
            offset
        })
        return products
    }
    
    async getOne(id) {
        const product = await ProductMapping.findByPk(id, {
            include: [
                {model: ProductPropValuesMapping, as: 'product_props_values', 
                    include:[{model: ProductPropMapping, as: 'product_prop'}]
                },
                {model: BrandMapping, as: 'brand'},
                {model: CategoryMapping, as: 'category'},
                {model: ProductHydroschemesMapping, as: 'hydroschemes'},
                {model: ProductMaterialsMapping, as: 'materials'},
            ]
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return product
    }
    

    async create(data, img) {
        // поскольку image не допускает null, задаем пустую строку
        const image = FileService.save(img) ?? ''
        const {name, price, categoryId = null, brandId = null} = data
        const alias = Translit(name)
        const product = await ProductMapping.create({name, price, image, categoryId, brandId, alias})
        if (data.props) { // свойства товара
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        return product
    }

    async update(id, data, img) {
        const product = await ProductMapping.findByPk(id)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(img)
        // если загружено новое изображение — надо удалить старое
        if (file && product.image) {
            FileService.delete(product.image)
        }
        // подготавливаем данные, которые надо обновить в базе данных        
        const {
            name = product.name,
            price = product.price,
            categoryId = product.categoryId,
            brandId = product.brandId,
            image = file ? file : product.image
        } = data
        const alias = Translit(name)
        await product.update({name, price, image, categoryId, brandId, alias})
        return product
    }

    async delete(id) {
        const product = await ProductMapping.findByPk(id)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        await product.destroy()
        return product
    }
}

export default new Product()