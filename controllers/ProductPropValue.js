import ProductPropValueModel from '../models/ProductPropValue.js'
import AppError from '../errors/AppError.js'

class ProductPropValue {

    async getByCategory(req, res, next) {
        try {
            if (!req.params.categoryId) {
                throw new Error('Не указан id категории')
            }
            const properties = await ProductPropValueModel.getByCategory(req.params.categoryId)
            res.json(properties)
        } catch(e) {
            console.log()
            next(AppError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const properties = await ProductPropValueModel.getAll(req.params.productId)
            res.json(properties)
        } catch(e) {
            console.log()
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            if (!req.params.id) {
                throw new Error('Не указано id свойства')
            }
            const property = await ProductPropValueModel.getOne(req.params.productId, req.params.id)
            res.json(property)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const property = await ProductPropValueModel.create(req.params.productId, req.body)
            res.json(property)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            if (!req.params.id) {
                throw new Error('Не указано id свойства')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const property = await ProductPropValueModel.update(req.params.productId, req.params.id, req.body)
            res.json(property)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            if (!req.params.id) {
                throw new Error('Не указано id свойства')
            }
            const property = await ProductPropValueModel.delete(req.params.productId, req.params.id)
            res.json(property)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new ProductPropValue()