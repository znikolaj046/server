import ProductHydroschemesModel from '../models/ProductHydroschemes.js'
import AppError from '../errors/AppError.js'

class ProductHydroschemes {
    async getAll(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const properties = await ProductHydroschemesModel.getAll(req.params.productId)
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
            const scheme = await ProductHydroschemesModel.getOne(req.params.productId, req.params.id)
            res.json(scheme)
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
            const scheme = await ProductHydroschemesModel.create(req.params.productId, req.body, req.files?.image)
            res.json(scheme)
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
            const scheme = await ProductHydroschemesModel.update(req.params.productId, req.params.id, req.body, req.files?.image)
            res.json(scheme)
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
            const scheme = await ProductHydroschemesModel.delete(req.params.productId, req.params.id)
            res.json(scheme)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new ProductHydroschemes()