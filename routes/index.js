import express from 'express'

import banner from './banner.js'
import product from './product.js'
import category from './category.js'
import brand from './brand.js'
import user from './user.js'
import basket from './basket.js'
import order from './order.js'

const router = new express.Router()

router.use('/banner', banner)
router.use('/product', product)
router.use('/category', category)
router.use('/brand', brand)
router.use('/user', user)
router.use('/basket', basket)
router.use('/order', order)

export default router