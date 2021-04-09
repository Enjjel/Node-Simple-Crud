const { Router } = require('express')
const router = Router()

const { check } = require('express-validator')
const { validateFields, validateJWT, isAdminRole } = require('../middlewares')
const controllerProduct = require('../controllers/product.controller')
const { existsCategoryById, existsProductById } = require('../helpers/dbValidations')

//bring all the categories
router.get('/', controllerProduct.getProducts)

//bring a categorie by ID
router.get('/:id',[
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFields
],controllerProduct.getProduct)

//crates a new categorie
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'not a valid id').isMongoId(),
    check('category').custom(existsCategoryById),
    validateFields
],controllerProduct.createProduct)

//updates a category
router.put('/:id',[
    validateJWT,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existsProductById),
    validateFields
],controllerProduct.updateProduct)

//deletes a category
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFields
],controllerProduct.deleteProduct)


module.exports = router