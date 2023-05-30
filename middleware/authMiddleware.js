import jwt from 'jsonwebtoken'
import AppError from '../errors/AppError.js'

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] // Bearer token
        if (!token) {
            throw new Error('Требуется авторизация')
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.auth = decoded
        next()
    } catch (e) {
        next(AppError.forbidden(e.message))
    }
}

export default auth