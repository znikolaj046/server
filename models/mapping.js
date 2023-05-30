import sequelize from '../sequelize.js'
import database from 'sequelize'

const { DataTypes } = database

/*
 * Описание моделей
 */

// модель «Заказ», таблица БД «orders»
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    comment: {type: DataTypes.STRING},
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
})

// позиции заказа, в одном заказе может быть несколько позиций (товаров)
const OrderItem = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})
//role: {type: DataTypes.STRING, defaultValue: 'USER', comment: 'роль (Админ)'},
// модель «Пользователь», таблица БД «users»
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, comment: 'Фамилия Имя Отчество'},
    email: {type: DataTypes.STRING, unique: true, comment: 'Email'},
    password: {type: DataTypes.STRING, comment: 'пароль'},
}, {comment: 'Пользователи'})

// модель «Пользователь», таблица БД «users»
const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, comment: 'Название роли пользователя'},
    is_admin: {type: DataTypes.INTEGER, comment: 'Администратор'},
    edit_products: {type: DataTypes.INTEGER, comment: 'может редактировать товар'},
    edit_content: {type: DataTypes.INTEGER, comment: 'может редактировать Содержимое сайта'},
    edit_users: {type: DataTypes.INTEGER, comment: 'может редактировать пользователей'},
}, {comment: 'Пользователи'})


// модель «Корзина», таблица БД «baskets»
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, {comment: 'Корзина пользователя'})

// связь между корзиной и товаром через промежуточную таблицу «basket_products»
// у этой таблицы будет составной первичный ключ (basket_id + product_id)
const BasketProduct = sequelize.define('basket_product', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1, comment: 'Количество товара в корзине'},
    price: {type: DataTypes.INTEGER, allowNull: false, comment: 'Цена товара в корзине'},
}, {comment: 'Продукт в корзине'})

// модель «Корзина», таблица БД «baskets»

// связь между корзиной и товаром через промежуточную таблицу «basket_products»
// у этой таблицы будет составной первичный ключ (basket_id + product_id)
const OrderProduct = sequelize.define('order_product', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1, comment: 'Количество товара в заказе'},
    price: {type: DataTypes.INTEGER, allowNull: false, comment: 'Цена товара в заказе'},
}, {comment: 'Продукт в заказе'})

// модель «Товар», таблица БД «products»
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false, comment: 'Наименование товара'},
    price: {type: DataTypes.INTEGER, allowNull: false, comment: 'Цена товара'},
    image: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.INTEGER, allowNull: false, comment: 'Статус (отображать/не отображать)'}
}, {comment: 'Товар'})

// модель «Категория», таблица БД «categories»
const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false, comment: 'Наименование категории'},
}, {comment: 'Категория товара'})

// модель «Бренд», таблица БД «brands»
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false, comment: 'Наименование бренда'},
}, {comment: 'Бренд товара'})

const Banner = sequelize.define('banner', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false, comment: 'Наименование баннера'},
    description: {type: DataTypes.STRING, unique: true, allowNull: false, comment: 'Описание баннера'},
    image: {type: DataTypes.STRING, allowNull: false, comment: 'Ссылка на файл изображения'},
    status: {type: DataTypes.INTEGER, allowNull: false, comment: 'Статус (отображать/не отображать)'}
}, {comment: 'Баннеры на главную'})

const StaticPages = sequelize.define('pages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, comment: 'Заголовок'},
    description: {type: DataTypes.STRING, allowNull: false, comment: 'Описание'},
    text: {type: DataTypes.TEXT, allowNull: false, comment: 'Текст'},
    status: {type: DataTypes.INTEGER, allowNull: false, comment: 'Статус (отображать/не отображать)'}
}, {comment: 'Статические страницы'})


const ProductImage = sequelize.define('product_image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, comment: 'Заголовок'},
    description: {type: DataTypes.STRING, allowNull: false, comment: 'Описание'},
    image: {type: DataTypes.STRING, allowNull: false, comment: 'Ссылка на файл изображения'},
    status: {type: DataTypes.INTEGER, allowNull: false, comment: 'Статус (отображать/не отображать)'}
}, {comment: 'Изображения товара'})

const ProductHydroschemes = sequelize.define('product_hydroschemes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, comment: 'Заголовок'},
    description: {type: DataTypes.STRING, allowNull: false, comment: 'Описание'},
    link: {type: DataTypes.STRING, allowNull: false, comment: 'Ссылка на файл гидросхемы'},
    status: {type: DataTypes.INTEGER, allowNull: false, comment: 'Статус (отображать/не отображать)'}
}, {comment: 'Гидросхемы товара'})


const ProductMaterials = sequelize.define('product_materials', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, comment: 'Заголовок'},
    description: {type: DataTypes.STRING, allowNull: false, comment: 'Описание'},
    link: {type: DataTypes.STRING, allowNull: false, comment: 'Ссылка на файл'},
    status: {type: DataTypes.INTEGER, allowNull: false, comment: 'Статус (отображать/не отображать)'}
}, {comment: 'Материалы товара'})

// свойства товара, у одного товара может быть много свойств
const ProductProp = sequelize.define('product_prop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, comment: 'Наименование свойства'},
    type: {type: DataTypes.STRING, allowNull: false, comment: 'Тип свойства'},
    description: {type: DataTypes.TEXT, allowNull: false, comment: 'Описание свойства'},
}, {comment: 'Свойства товара'})

const ProductPropListValues = sequelize.define('product_prop_list_values', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.INTEGER, allowNull: false, comment: 'Тип свойства'},
    value: {type: DataTypes.STRING, allowNull: false, comment: 'Значение свойства'},
}, {comment: 'Элементы характеристик товара типа список'})

const ProductPropValues = sequelize.define('product_prop_values', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false, comment: 'Значение свойства'},
}, {comment: 'Значения свойств'})


/*
 * Описание связей
 */

// связь many-to-many товаров и корзин через промежуточную таблицу basket_products;
// товар может быть в нескольких корзинах, в корзине может быть несколько товаров
Basket.belongsToMany(Product, { through: BasketProduct, onDelete: 'CASCADE' , comment: 'Товары'})
Product.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' , comment: 'Корзины пользователя'})

// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// это обеспечит возможность любых include при запросах findAll, findOne, findByPk
Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)
Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)


Category.hasMany(Category, {as : 'children'})
Category.belongsTo(Category)
// связь категории с товарами: в категории может быть несколько товаров, но
// каждый товар может принадлежать только одной категории
Category.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Category)

// связь бренда с товарами: у бренда может быть много товаров, но каждый товар
// может принадлежать только одному бренду
Brand.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Brand)

// связь many-to-many товаров и пользователей через промежуточную таблицу rating;
// за один товар могут проголосовать несколько зарегистрированных пользователей,
// один пользователь может проголосовать за несколько товаров
//Product.belongsToMany(User, {through: Rating, onDelete: 'CASCADE'})
//User.belongsToMany(Product, {through: Rating, onDelete: 'CASCADE'})

// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// это обеспечит возможность любых include при запросах findAll, findOne, findByPk

Role.hasMany(User)
User.belongsTo(Role)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(ProductImage)
ProductImage.belongsTo(Product)

Product.hasMany(ProductHydroschemes, {as: 'hydroschemes', onDelete: 'CASCADE'})
ProductHydroschemes.belongsTo(Product)

Product.hasMany(ProductMaterials, {as: 'materials', onDelete: 'CASCADE'})
ProductMaterials.belongsTo(Product)

// связь товара с его свойствами: у товара может быть несколько свойств, но
// каждое свойство связано только с одним товаром
Category.hasMany(ProductProp, {as: 'props', onDelete: 'CASCADE'})
ProductProp.belongsTo(Category)


ProductProp.hasMany(ProductPropListValues, {as: 'props_list_values', onDelete: 'CASCADE'})
ProductPropListValues.belongsTo(ProductProp)

ProductProp.hasMany(ProductPropValues, {as: 'props_values', onDelete: 'CASCADE'})
ProductPropValues.belongsTo(ProductProp)

Product.hasMany(ProductPropValues, {as: 'product_props_values', onDelete: 'CASCADE'})
ProductPropValues.belongsTo(Product)

// связь заказа с позициями: в заказе может быть несколько позиций, но
// каждая позиция связана только с одним заказом
Order.hasMany(OrderItem, {as: 'items', onDelete: 'CASCADE'})
OrderItem.belongsTo(Order)

// связь заказа с пользователями: у пользователя может быть несколько заказов,
// но заказ может принадлежать только одному пользователю
User.hasMany(Order, {as: 'orders', onDelete: 'SET NULL'})
Order.belongsTo(User)


export {
    User,
    Role,
    Basket,
    Product,
    Category,
    Brand,
    BasketProduct,
    ProductProp,
    ProductPropListValues,
    ProductPropValues,
    ProductImage,
    Order,
    OrderItem,
    Banner,
    ProductHydroschemes,
    ProductMaterials,
    StaticPages
}