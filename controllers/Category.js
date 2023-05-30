import { Category as CategoryMapping } from '../models/mapping.js'
import CategoryModel from '../models/Category.js'
import AppError from '../errors/AppError.js'

class Category {
    async getAll(req, res, next) {
        try {
            const categories = await CategoryModel.getAll()
            res.json(categories)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getChildCategories(req, res, next) {
        try {
            const categories = await CategoryModel.getAll()
            res.json(categories)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.alias) {
                throw new Error('Не указан id категории')
            }

            const category = await CategoryModel.getOne(req.params.alias)
            if (!category) {
                throw new Error('Категория не найдена в БД')
            }
            res.json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const category = await CategoryModel.create({name: req.body.name, categoryId: req.body.categoryId})
            res.json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id категории')
            }
            const id = req.params.id
            const category = await CategoryModel.update(id, {name: req.body.name, categoryId: req.body.categoryId})
            res.json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id категории')
            }
            const category = await CategoryMapping.findByPk(req.params.id)
            if (!category) {
                throw new Error('Категория не найдена в БД')
            }
            await category.destroy()
            res.json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Category()