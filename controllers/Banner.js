import BannerModel from '../models/Banner.js'
import AppError from '../errors/AppError.js'

class Banner {
    async getAll(req, res, next) {
        try {
            const Banners = await BannerModel.getAll()
            res.json(Banners)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id баннера')
            }
            const Banner = await BannerModel.getOne(req.params.id)
            res.json(Banner)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const Banner = await BannerModel.create(req.body, req.files?.image)
            res.json(Banner)
        } catch(e) {
            console.log(req.body)
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {

        try {
            if (!req.params.id) {
                throw new Error('Не указан id баннера')
            }
            const Banner = await BannerModel.update(req.params.id, req.body, req.files?.image)
            res.json(Banner)
        } catch(e) {

            console.log(e)
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id бренда')
            }
            const Banner = await BannerModel.delete(req.params.id)
            res.json(Banner)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Banner()