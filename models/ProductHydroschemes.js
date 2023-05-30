import { ProductHydroschemes as ProductHydroschemesMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import FileService from '../services/File.js'
import AppError from '../errors/AppError.js'

class ProductHydroschemes {
    async getAll(productId) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const schemes = await ProductHydroschemesMapping.findAll({
            where: {productId}
        })
        return schemes
    }

    async getOne(productId, id) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const scheme = await ProductHydroschemesMapping.findOne({
            where: {productId, id}
        })
        if (!scheme) {
            throw new Error('Свойство Категории не найдено в БД')
        }
        return scheme
    }

    async create(productId, data, img) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }

        const link = FileService.save(img) ?? ''
        const {status = null, title = null, description = null} = data
        const scheme = await ProductHydroschemesMapping.create({title, description, status, link, productId})
        return scheme
    }

    async update(productId, id, data, img) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const scheme = await ProductHydroschemesMapping.findOne({where: {productId, id}})
        if (!scheme) {
            throw new Error('Свойство Категория не найдено в БД')
        }

        const file = FileService.save(img)
        // если загружено новое изображение — надо удалить старое
        if (file && scheme.link) {
            FileService.delete(scheme.link)
        }

        const {
            status = scheme.status, 
            title = scheme.title, 
            description = scheme.description,
            link = file ? file : scheme.link
        } = data
        await scheme.update({title, description, status, link, productId})
        return scheme
    }

    async delete(productId, id) {
        const Product = await ProductMapping.findByPk(productId)
        if (!Product) {
            throw new Error('Товар не найден в БД')
        }
        const scheme = await ProductHydroschemesMapping.findOne({where: {productId, id}})
        if (!scheme) {
            throw new Error('Свойство Категория не найдено в БД')
        }
        await scheme.destroy()
        return scheme
    }
}

export default new ProductHydroschemes()
