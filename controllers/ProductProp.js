import ProductPropModel from '../models/ProductProp.js'
import AppError from '../errors/AppError.js'

class ProductProp {

    async getValues(req, res, next) {
        try {
            if (!req.params.categoryId) {
                throw new Error('Не указан id категории')
            }
            const properties = await ProductPropModel.getValuesByCategory(req.params.categoryId)            

            let property_values = [];
            

            properties.map((prop) => {
                //console.log(prop.dataValues)
                let values = {id:0, name:'', values: []};
                let prop_values = []

                values.id = prop.dataValues.id
                values.name = prop.dataValues.name
                
                prop.dataValues.props_values.map((prop_value) => {
                    prop_values.push(prop_value.value)
                })

                prop_values = [... new Set(prop_values)]
                values.values = prop_values
                property_values.push(values)
                //prop.dataValues.name
            })

            //console.log(property_values)
            res.json(property_values)
            
        } catch(e) {
            console.log()
            next(AppError.badRequest(e.message))
        }
    }

    async getAllValues(req, res, next) {
        try {
            const properties = await ProductPropModel.getAllValues()

            let property_values = [];
            

            properties.map((prop) => {
                //console.log(prop.dataValues)
                let values = {id:0, name:'', values: []};
                let prop_values = []

                values.id = prop.dataValues.id
                values.name = prop.dataValues.name
                
                prop.dataValues.props_values.map((prop_value) => {
                    prop_values.push(prop_value.value)
                })

                prop_values = [... new Set(prop_values)]
                values.values = prop_values
                property_values.push(values)
                //prop.dataValues.name
            })

            //console.log(property_values)
            res.json(property_values)
        } catch(e) {
            console.log()
            next(AppError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            if (!req.params.categoryId) {
                throw new Error('Не указан id категории')
            }
            const properties = await ProductPropModel.getAll(req.params.categoryId)
            res.json(properties)
        } catch(e) {
            console.log()
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.categoryId) {
                throw new Error('Не указан id категории')
            }
            if (!req.params.id) {
                throw new Error('Не указано id свойства')
            }
            const property = await ProductPropModel.getOne(req.params.categoryId, req.params.id)
            res.json(property)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.params.categoryId) {
                throw new Error('Не указан id категории')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const property = await ProductPropModel.create(req.params.categoryId, req.body)
            res.json(property)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.categoryId) {
                throw new Error('Не указан id категории')
            }
            if (!req.params.id) {
                throw new Error('Не указано id свойства')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const property = await ProductPropModel.update(req.params.categoryId, req.params.id, req.body)
            res.json(property)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.categoryId) {
                throw new Error('Не указан id категории')
            }
            if (!req.params.id) {
                throw new Error('Не указано id свойства')
            }
            const property = await ProductPropModel.delete(req.params.categoryId, req.params.id)
            res.json(property)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new ProductProp()