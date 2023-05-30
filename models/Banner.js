import { Banner as BannerMapping } from './mapping.js'
import FileService from '../services/File.js'
import AppError from '../errors/AppError.js'

class Banner {
    async getAll() {
        const banners = await BannerMapping.findAll()
        return banners
    }

    async getOne(id) {
        const brand = await BannerMapping.findByPk(id)
        if (!brand) {
            throw new Error('Баннер не найден в БД')
        }
        return brand
    }

    async create(data, img) {        
        const image = FileService.save(img) ?? ''
        const {name = null, description = null, status = null} = data
        const banners = await BannerMapping.create({name, description, image, status})
        return banners
    }

    async update(id, data, img) {
        const banner = await BannerMapping.findByPk(id)
        if (!banner) {
            throw new Error('Баннер не найден в БД')
        }

        const file = FileService.save(img)
        // если загружено новое изображение — надо удалить старое
        if (file && banner.image) {
            FileService.delete(banner.image)
        }

        const {
            name = banner.name,
            description = banner.description,
            status = banner.status,
            image = file ? file : banner.image
        } = data
        await banner.update({name, description, image, status})

        return banner
    }

    async delete(id) {
        const banner = await BannerMapping.findByPk(id)
        if (!banner) {
            throw new Error('Бренд не найден в БД')
        }
        await banner.destroy()
        return banner
    }
}

export default new Banner()