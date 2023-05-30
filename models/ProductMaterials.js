import { ProductMaterials as ProductMaterialsMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import FileService from '../services/File.js'
import AppError from '../errors/AppError.js'

class ProductMaterials {
    async getAll(productId) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const material = await ProductMaterialsMapping.findAll({
            where: {productId}
        })
        return material
    }

    async getOne(productId, id) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const material = await ProductMaterialsMapping.findOne({
            where: {productId, id}
        })
        if (!material) {
            throw new Error('Свойство Категории не найдено в БД')
        }
        return material
    }

    async create(productId, data, img) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }

        const link = FileService.save(img) ?? ''
        const {status = null, title = null, description = null} = data
        const material = await ProductMaterialsMapping.create({title, description, status, link, productId})
        return material
    }

    async update(productId, id, data, img) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const material = await ProductMaterialsMapping.findOne({where: {productId, id}})
        if (!material) {
            throw new Error('Свойство Категория не найдено в БД')
        }

        const file = FileService.save(img)
        // если загружено новое изображение — надо удалить старое
        if (file && material.link) {
            FileService.delete(material.link)
        }

        const {
            status = material.status, 
            title = material.title, 
            description = material.description,
            link = file ? file : material.link
        } = data
        await material.update({title, description, status, link, productId})
        return material
    }

    async delete(productId, id) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const material = await ProductMaterialsMapping.findOne({where: {productId, id}})
        if (!material) {
            throw new Error('Свойство Категория не найдено в БД')
        }
        await material.destroy()
        return material
    }
}

export default new ProductMaterials()
