import ProductMaterialsModel from '../models/ProductMaterials.js'
import AppError from '../errors/AppError.js'

class ProductMaterials {
    async getAll(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const properties = await ProductMaterialsModel.getAll(req.params.productId)
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
            const material = await ProductMaterialsModel.getOne(req.params.productId, req.params.id)
            res.json(material)
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
            const material = await ProductMaterialsModel.create(req.params.productId, req.body, req.files?.image)
            res.json(material)
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
            const material = await ProductMaterialsModel.update(req.params.productId, req.params.id, req.body, req.files?.image)
            res.json(material)
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
            const material = await ProductMaterialsModel.delete(req.params.productId, req.params.id)
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new ProductMaterials()