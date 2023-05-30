import express from 'express'
import ProductController from '../controllers/Product.js'
import ProductPropValueController from '../controllers/ProductPropValue.js'
import ProductHydroschemesController from '../controllers/ProductHydroschemes.js'
import ProductMaterialsController from '../controllers/ProductMaterials.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

/*
 * Товары
 */
router.get('/getall', ProductController.getAll)
router.get('/getall/filter/:filter(*)', ProductController.getAll)
// список товаров выбранной категории и выбранного бренда
router.get('/getall/categoryId/:categoryId([0-9]+)/brandId/:brandId([0-9]+)/filter/:filter(*)', ProductController.getAll)
// список товаров выбранной категории
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
router.get('/getall/categoryId/:categoryId([0-9]+)/filter/:filter(*)', ProductController.getAll)
// список товаров выбранного бренда
router.get('/getall/brandId/:brandId([0-9]+)', ProductController.getAll)
router.get('/getall/brandId/:brandId([0-9]+)/filter/:filter(*)', ProductController.getAll)
// список всех товаров каталога
router.get('/getall', ProductController.getAll)
// получить один товар каталога
router.get('/getone/:id([0-9]+)', ProductController.getOne)
// создать товар каталога — нужны права администратора
router.post('/create', authMiddleware, adminMiddleware, ProductController.create)
// обновить товар каталога  — нужны права администратора
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.update)
// удалить товар каталога  — нужны права администратора
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.delete)

/*
 * Свойства
 */

// список свойств товара
router.get('/:productId([0-9]+)/property/getall', ProductPropValueController.getAll)
// одно свойство товара
router.get('/:productId([0-9]+)/property/getone/:id([0-9]+)', ProductPropValueController.getOne)
// создать свойство товара
router.post(
    '/:productId([0-9]+)/property/create',
    authMiddleware,
    adminMiddleware,
    ProductPropValueController.create
)
// обновить свойство товара
router.put(
    '/:productId([0-9]+)/property/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductPropValueController.update
)
// удалить свойство товара
router.delete(
    '/:productId([0-9]+)/property/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductPropValueController.delete
)

/*
 * Гидросхемы
 */

// список свойств товара
router.get('/:productId([0-9]+)/scheme/getall', ProductHydroschemesController.getAll)
// одно свойство товара
router.get('/:productId([0-9]+)/scheme/getone/:id([0-9]+)', ProductHydroschemesController.getOne)
// создать свойство товара
router.post(
    '/:productId([0-9]+)/scheme/create',
    authMiddleware,
    adminMiddleware,
    ProductHydroschemesController.create
)
// обновить свойство товара
router.post(
    '/:productId([0-9]+)/scheme/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductHydroschemesController.update
)
// удалить свойство товара
router.delete(
    '/:productId([0-9]+)/scheme/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductHydroschemesController.delete
)


/*
 * Гидросхемы
 */

// список свойств товара
router.get('/:productId([0-9]+)/material/getall', ProductMaterialsController.getAll)
// одно свойство товара
router.get('/:productId([0-9]+)/material/getone/:id([0-9]+)', ProductMaterialsController.getOne)
// создать свойство товара
router.post(
    '/:productId([0-9]+)/material/create',
    authMiddleware,
    adminMiddleware,
    ProductMaterialsController.create
)
// обновить свойство товара
router.post(
    '/:productId([0-9]+)/material/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductMaterialsController.update
)
// удалить свойство товара
router.delete(
    '/:productId([0-9]+)/material/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductMaterialsController.delete
)


export default router