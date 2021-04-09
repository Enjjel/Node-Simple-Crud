const { getCategories } = require('../controllers/categories.controller')
const Role = require('../models/model_roles')
const User = require('../models/model_user')
const Categories = require('../models/model_categories')
const Product = require('../models/model_product')


const roleValidator = async (role = '') => {
    const existsRole = await Role.findOne({role})

    if (!existsRole)
    {
        throw new Error(`The Role: ${role} is not registered in the database`)
    }
}

const emailValidator = async (email = '') => {

    const existsEmail = await User.findOne({email})

    if (existsEmail)
    {
        throw new Error(`The email: ${email} already exists`)
    }

}

const existsUserById = async (id = '') => {

    const existUser = await User.findById(id)

    if (!existUser) {
        throw new Error(`The user with id: ${id} not exists`)
    }
}

const existsCategoryById = async (id = '') => {
    const exists = await Categories.findById(id);

    if (!exists) {
        throw new Error(`The category with id ${id} not exists`)
    }
}

const existsProductById = async (id = '') => {
    const exists = await Product.findById(id);

    if (!exists) {
        throw new Error(`The category with id ${id} not exists`)
    }
}

module.exports = {
    emailValidator,
    roleValidator,
    existsUserById,
    existsCategoryById,
    existsProductById
}
