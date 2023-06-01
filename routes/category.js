import express from 'express'
import CategoryController from '../controllers/Category.js'
import ProductPropController from '../controllers/ProductProp.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', CategoryController.getAll)
router.get('/getone/:alias([0-9a-z_]+)', CategoryController.getOne)
router.post('/create', authMiddleware, adminMiddleware, CategoryController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, CategoryController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, CategoryController.delete)

// список свойств товара
router.get('/:categoryId([0-9]+)/property/getall', ProductPropController.getAll)
// список свойств товара
router.get('/:categoryId([0-9]+)/property/getvalues', ProductPropController.getValues)
// список свойств товара
router.get('/property/getvalues', ProductPropController.getAllValues)

// одно свойство товара
router.get('/:categoryId([0-9]+)/property/getone/:id([0-9]+)', ProductPropController.getOne)
// создать свойство товара
router.post(
    '/:categoryId([0-9]+)/property/create',
    authMiddleware,
    adminMiddleware,
    ProductPropController.create
)
// обновить свойство товара
router.put(
    '/:categoryId([0-9]+)/property/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductPropController.update
)
// удалить свойство товара
router.delete(
    '/:categoryId([0-9]+)/property/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductPropController.delete
)

export default router