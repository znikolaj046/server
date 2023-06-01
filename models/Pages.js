import { StaticPages as StaticPageMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Pages {
    async getAll() {
        const Pages = await StaticPageMapping.findAll()
        return Pages
    }

    async getOne(alias) {

        const where = {}
        where.alias = alias
        const page = await StaticPageMapping.findOne({
            where
        })
        if (!page) {
            throw new Error('Страница не найдена в БД')
        }
        return page
    }

    async getById(id) {
        const page = await StaticPageMapping.findByPk(id)
        if (!page) {
            throw new Error('Страница не найдена в БД')
        }
        return page
    }


    async create(data) {        
        const {title = null, description = null, status = null} = data
        const Pages = await StaticPageMapping.create({title, description, alias, status})
        return Pages
    }

    async update(id, data) {
        const Page = await StaticPageMapping.findByPk(id)
        if (!Page) {
            throw new Error('Страница не найдена в БД')
        }

        const {
            title = Page.title,
            description = Page.description,
            status = Page.status
        } = data
        await Page.update({title, description, alias, status})

        return Page
    }

    async delete(id) {
        const Page = await StaticPageMapping.findByPk(id)
        if (!Page) {
            throw new Error('Бренд не найден в БД')
        }
        await Page.destroy()
        return Page
    }
}

export default new Pages()