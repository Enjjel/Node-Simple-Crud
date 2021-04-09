const { Router, json } = require('express')
const router = Router()

const { check } = require('express-validator')
const { validateFields, validateJWT, isAdminRole } = require('../middlewares')
const controllerCategories = require('../controllers/categories.controller')
const { existsCategoryById } = require('../helpers/dbValidations')

//bring all the categories
router.get('/', controllerCategories.getCategories)

//bring a categorie by ID
router.get('/:id',[
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFields
],controllerCategories.getCategory)

//crates a new categorie
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
],controllerCategories.createCategory)

//updates a category
router.put('/:id',[
    validateJWT,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existsCategoryById),
    check('name', 'The name is required').not().isEmpty(),
    validateFields
],controllerCategories.updateCategory)

//deletes a category
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFields
],controllerCategories.deleteCategory)


module.exports = router