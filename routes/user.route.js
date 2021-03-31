const { Router } = require('express')
const router = Router()
const controllerUser = require('../controllers/user.controller')

const { validateFields, validateJWT,validRole, isAdminRole}  = require('../middlewares')
const {roleValidator, emailValidator, existsUserById} = require('../helpers/dbValidations')
const { check } = require('express-validator')


router.get('/', controllerUser.getUsers)

router.post('/new-user', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and has to be more than six letters').not().isEmpty().isLength({min: 6}),
    check('email','invalid email').isEmail(),
    check('email').custom(emailValidator),
    check('role').custom(roleValidator),
    validateFields
], controllerUser.postUsers)

router.put('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existsUserById),
    validateFields
],controllerUser.putUsers)

router.delete('/:id', [
    validateJWT,
    validRole,
    isAdminRole,
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existsUserById),
    validateFields
],controllerUser.deleteUsers)


module.exports = router