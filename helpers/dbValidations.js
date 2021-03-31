const Role = require('../models/model_roles')
const User = require('../models/model_user')


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

    if (!existUser)
    {
        throw new Error(`The user with id: ${id} not exists`)
    }

}

module.exports = {
    emailValidator,
    roleValidator,
    existsUserById
}
