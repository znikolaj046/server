import express from 'express'
import BannerController from '../controllers/Banner.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', BannerController.getAll)
router.get('/getone/:id([0-9]+)', BannerController.getOne)
router.post('/update/:id([0-9]+)', authMiddleware, adminMiddleware, BannerController.update)
router.post('/create', authMiddleware, adminMiddleware, BannerController.create)
//router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, BannerController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, BannerController.delete)

export default router