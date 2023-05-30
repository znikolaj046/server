import {Sequelize} from 'sequelize'

export default new Sequelize(
    process.env.DB_NAME, // база данных
    process.env.DB_USER, // пользователь
    process.env.DB_PASS, // пароль
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)