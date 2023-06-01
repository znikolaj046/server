import PagesModel from '../models/Pages.js'
import Translit from '../controllers/Translit.js'
import AppError from '../errors/AppError.js'

class Pages {
    async getAll(req, res, next) {
        try {
            const Pages = await PagesModel.getAll()
            res.json(Pages)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getById(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id страницы')
            }
            const Pages = await PagesModel.getById(req.params.id)
            res.json(Pages)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.alias) {
                throw new Error('Не указан URL категории')
            }

            const Pages = await PagesModel.getOne(req.params.alias)
            if (!Pages) {
                throw new Error('Категория не найдена в БД')
            }
            res.json(Pages)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(data) {
        const {title, description,text} = data
        const alias = Translit(title)
        console.log(alias)
        const pages = await PagesModel.create({title, description, text, alias})
        return pages
    }

    async update(id, data) {
        const pages = await PagesModel.findByPk(id)
        if (!pages) {
            throw new Error('Страница не найдена в БД')
        }

        const {alias = Translit(data.title), title = pages.title, description = pages.description, text = pages.text} = data
        console.log('alias', alias)
        await pages.update({name, title, alias, description, text})
        return pages
    }

    async delete(id) {
        const pages = await PagesModel.findByPk(id)
        if (!pages) {
            throw new Error('Страница не найдена в БД')
        }
        await pages.destroy()
        return pages
    }
}

export default new Pages()