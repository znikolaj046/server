import { ProductPropValues as ProductPropValueMapping } from './mapping.js'
import { ProductProp as ProductPropMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { Category as CategoryMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class ProductPropValue {
    async getByCategory(productId) {
        const Category = await CategoryMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const properties = await ProductPropValueMapping.findAll({
            where: {productId},
            include: [
                {model: ProductPropMapping, as: 'product_prop'}
            ]
        })
        return properties
    }

    async getOne(productId, id) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const property = await ProductPropValueMapping.findOne({
            where: {productId, id},
            include: [
                {model: ProductPropMapping, as: 'product_prop'}
            ]
        })
        if (!property) {
            throw new Error('Свойство Категории не найдено в БД')
        }
        return property
    }

    async create(productId, data) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const {name, productPropId, value} = data
        const property = await ProductPropValueMapping.create({name, value, productPropId, productId})
        return property
    }

    async update(productId, id, data) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const property = await ProductPropValueMapping.findOne({where: {productId, id}})
        if (!property) {
            throw new Error('Свойство Категория не найдено в БД')
        }
        const {name = property.name, value = property.value} = data
        await property.update({name, value})
        return property
    }

    async delete(productId, id) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const property = await ProductPropValueMapping.findOne({where: {productId, id}})
        if (!property) {
            throw new Error('Свойство Категорияа не найдено в БД')
        }
        await property.destroy()
        return property
    }
}

export default new ProductPropValue()