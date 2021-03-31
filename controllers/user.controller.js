const { response } =  require('express')
const User = require('../models/model_user')
const bcrypt = require('bcryptjs')


const controllerUser = []

controllerUser.getUsers = async (req, res) => {
    const {limit = 5, to = 0} = req.query
    const query = {status: true}

    //const users = await User.find(query).limit(Number(limit)).skip(Number(to))
    
    //const totalUsers = await User.countDocuments(query)

    const [totalUsers, users] = await Promise.all([
        User.find(query).limit(Number(limit)).skip(Number(to)),
        User.countDocuments(query)
    ])

    res.json({
        totalUsers,
        users
    })
}

controllerUser.postUsers = async (req, res) => {

    const {name, password, role, email} = req.body
    const user = new User({name, password,role, email})

    //Encrypt the password
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync())

    await user.save()
    
    res.json({
        user
    })
}

controllerUser.putUsers = async (req, res = response) => {

    const {id} = req.params
    const {_id, password, google, email, ...toUpdate} = req.body

    if (password)
    {
        //Encrypt the password
        toUpdate.password = bcrypt.hashSync(password, bcrypt.genSaltSync())
    }

    const user = await User.findByIdAndUpdate(id, toUpdate)

    res.json({
        res: 'put',
        user
    })
}

controllerUser.deleteUsers = async (req, res) => {
    const {id} = req.params

    //const user = await User.findOneAndDelete(id)
    const user = await User.findByIdAndUpdate(id, {status: false})

    res.json({user})
}


module.exports = controllerUser