import { Category as CategoryMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Category {
    async getAll() {
        const where = {}
        where.categoryId = null
        const categories = await CategoryMapping.findAll({
            where
        })
        return categories
    }

    async getOne(id) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        return category
    }

    async create(data) {
        const {name} = data
        const category = await CategoryMapping.create({name})
        return category
    }

    async update(id, data) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        const {name = category.name} = data
        await category.update({name})
        return category
    }

    async delete(id) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        await category.destroy()
        return category
    }
}

export default new Category()