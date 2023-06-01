import { ProductProp as CategoryPropMapping } from './mapping.js'
import { ProductPropValues as ProductPropValueMapping } from './mapping.js'
import { Category as CategoryMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class ProductProp {

    async getValuesByCategory(categoryId) {
        const Category = await CategoryMapping.findByPk(categoryId)
        if (!Category) {
            throw new Error('Категория не найдена в БД')
        }
        const values = await CategoryPropMapping.findAll({
                        fields: 'value', unique: true,
                        where: {categoryId}, 
                        include: {model: ProductPropValueMapping, as: 'props_values', include: { model: ProductMapping, as: 'product', where:{status:1, categoryId: categoryId}}}
                    })

        return values
    }

    async getAllValues() {
        const values = await CategoryPropMapping.findAll({
            include: {model: ProductPropValueMapping, as: 'props_values', include: { model: ProductMapping, as: 'product', where:{status:1}}}
        })

        return values
    }

    async getAll(categoryId) {
        const Category = await CategoryMapping.findByPk(categoryId)
        if (!Category) {
            throw new Error('Категория не найдена в БД')
        }
        const properties = await CategoryPropMapping.findAll({where: {categoryId}})
        return properties
    }

    async getOne(categoryId, id) {
        const Category = await CategoryMapping.findByPk(categoryId)
        if (!Category) {
            throw new Error('Категория не найдена в БД')
        }
        const property = await CategoryPropMapping.findOne({where: {categoryId, id}})
        if (!property) {
            throw new Error('Свойство Категории не найдено в БД')
        }
        return property
    }

    async create(categoryId, data) {
        const Category = await CategoryMapping.findByPk(categoryId)
        if (!Category) {
            throw new Error('Категория не найдена в БД')
        }
        const {name, type, description} = data
        const property = await CategoryPropMapping.create({name, type, description, categoryId})
        return property
    }

    async update(categoryId, id, data) {
        const Category = await CategoryMapping.findByPk(categoryId)
        if (!Category) {
            throw new Error('Категория не найдена в БД')
        }
        const property = await CategoryPropMapping.findOne({where: {CategoryId, id}})
        if (!property) {
            throw new Error('Свойство Категория не найдено в БД')
        }
        const {name = property.name, type = property.type, description = property.description} = data
        await property.update({name, type, description})
        return property
    }

    async delete(categoryId, id) {
        const Category = await CategoryMapping.findByPk(categoryId)
        if (!Category) {
            throw new Error('Категория не найдена в БД')
        }
        const property = await CategoryPropMapping.findOne({where: {categoryId, id}})
        if (!property) {
            throw new Error('Свойство Категорияа не найдено в БД')
        }
        await property.destroy()
        return property
    }
}

export default new ProductProp()