const { Router } = require('express')
const {validateFields} = require('../middlewares/validateFields')
const { check } = require('express-validator')
const authController = require('../controllers/auth.controller')
const router = Router()



router.get('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
],authController.loginValidation)


module.exports = router 