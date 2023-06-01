import { Category as CategoryMapping } from './mapping.js'
import Translit from '../controllers/Translit.js'
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

    async getById(id) {
        const where = {}
        where.id = id
        const category = await CategoryMapping.findOne({
            where
        })
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        return category
    }

    async getOne(alias) {
        const where = {}
        where.alias = alias
        const category = await CategoryMapping.findOne({
            where
        })
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        return category
    }

    async create(data) {
        const {name, categoryId} = data
        const alias = Translit(name)
        console.log(alias)
        const category = await CategoryMapping.create({name, categoryId, alias})
        return category
    }

    async update(id, data) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }

        const {alias = Translit(data.name), name = category.name, categoryId = category.categoryId} = data
        console.log('alias', alias)
        await category.update({name, categoryId, alias})
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