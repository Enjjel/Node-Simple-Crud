const { request, response } = require('express')
const Product = require('../models/model_product')
const controllerProduct = []


controllerProduct.getProducts = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const query = {status : true}

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query).limit(Number(limit)).skip(from).populate('user', 'name').populate('category', 'name')
    ])

    res.json({total, products})
}

controllerProduct.getProduct = async (req = request, res = response) => {
    const { id } = req.params

    const find_id = await Product.findById(id).populate('user', 'name').populate('category', 'name')

    if (!find_id) {
        res.status(400).json({error})
    }

    res.status(200).json(find_id)
}   


controllerProduct.createProduct = async (req = request, res = response) => {
    const { user, status, name, ...body} = req.body

    const exists = await Product.findOne({ name })

    if (exists) {
        res.status(400).json({
            error: `The product with name ${name} is already created`
        })
    }

    const data = {
        ...body,
        name : name.toUpperCase(),
        user : req.user._id,
    }

    const newProduct = new Product(data)
    await newProduct.save()

    res.status(201).json({newProduct})
}   

controllerProduct.updateProduct = async (req = request, res = response) => {
    const { id } = req.params
    const { status, user, ...data } = req.body

    data.user = req.user._id
    data.name = data.name.toUpperCase()

    const update = await Product.findByIdAndUpdate(id, data, {new : true})

    res.json(update)
}

controllerProduct.deleteProduct = async (req = request, res = response) => {
    const { id } = req.params

    const toDelete = await Product.findByIdAndUpdate(id, {status: false}, {new: true})

    if (!toDelete) {
        res.status(404).json({error: `There is no category`})
    }

    res.status(200).json({deleted_product: toDelete})
}


module.exports = controllerProduct