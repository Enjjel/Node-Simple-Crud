const { request, response } = require('express')
const Categories = require('../models/model_categories')


const controllerCategories = [];

controllerCategories.getCategories = async (req = request, res = response) => {
    const { limit = 5, from = 0} = req.query
    const query = {status: true}

    const [totalCategories, categories] = await Promise.all([
        Categories.find(query).skip(Number(from)).limit(Number(limit)).populate('user', 'name'),
        Categories.countDocuments(query)
    ])  

    res.status(200).json({totalCategories, categories})
}

controllerCategories.getCategory = async (req = request, res = response) => {
    const { id } = req.params
    //const query = {status: true}

    const category = await Categories.findById(id).populate('user', 'name')

    res.json({category})
}


controllerCategories.createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase()

    const nameBD = await Categories.findOne({ name });

    if (nameBD) {
        res.status(400).json({
            error: `The category with name ${name} is already created`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const newCategory = new Categories(data)

    newCategory.save()

    res.status(201).json({ newCategory })
}


controllerCategories.updateCategory = async (req = request, res = response) => {
    const { id } = req.params
    const { status, user, ...data } = req.body

    data.name = data.name.toUpperCase()
    data.user = req.user._id

    const findOne = await Categories.findByIdAndUpdate(id, data, {new : true})

    res.json(findOne)
}

controllerCategories.deleteCategory = async (req = request, res = response) => {
    const { id } = req.params

    const findOne = await Categories.findByIdAndUpdate(id, {status: false}, {new: true})

    if (!findOne) {
        res.status(404).json({error: `There is no category`})
    }

    res.status(200).json({deleted_category: findOne})
}

module.exports = controllerCategories