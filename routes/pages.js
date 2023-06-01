import express from 'express'
import PagesController from '../controllers/Pages.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', PagesController.getAll)
router.get('/getone/:alias([0-9a-z_]+)', PagesController.getOne)
router.get('/getbyid/:id([0-9]+)', PagesController.getById)
router.post('/update/:id([0-9]+)', authMiddleware, adminMiddleware, PagesController.update)
router.post('/create', authMiddleware, adminMiddleware, PagesController.create)
//router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, BannerController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, PagesController.delete)

export default router