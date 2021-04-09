const { request, response } = require('express')
const { ObjectId } = require('mongoose').Types
const { User, Categories, Product } = require('../models')

const controllerBrowser = []
const validCollection = ['users', 'roles', 'categories', 'products']

const searchUser = async (term = '', res = response) => {
    
    const isMongoID = ObjectId.isValid(term)

    if (isMongoID) {
        const user = await User.findById(term)

        return res.json({
            results: (user) ? [ user ] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const users = await User.find({
        $or: [{name : regex}, {email : regex}],
        $and: [{status : true}]
    })

    return res.json({results : users})
}

const searchCategory = async (term = '', res = response) => {
    
    const isMongoID = ObjectId.isValid(term)

    if (isMongoID) {
        const category = await Categories.findById(term)

        return res.json({
            results: (category) ? [ category ] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const categories = await Categories.find({name : regex})

    return res.json({results : categories})
}

const searchProduct = async (term = '', res = response) => {
    
    const isMongoID = ObjectId.isValid(term)

    if (isMongoID) {
        const product = await Product.findById(term)

        return res.json({
            results: (product) ? [ product ] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const products = await Product.find({name : regex})

    return res.json({results : products})
}

controllerBrowser.search = (req = request, res = response) => {

    const { collection, term } = req.params

    if (!validCollection.includes(collection)) {
        res.status(400).json({error : 'invalid category'})
    }

    switch(collection) {
        case 'users':
            searchUser(term, res)
        break;   

        case 'categories':
            searchCategory(term, res)
        break;   

        case 'products':
            searchProduct(term, res)
        break;  

        default:
           res.status(500).json({error: 'invalid path'}) 
        break;   
    }
}

module.exports = controllerBrowser

