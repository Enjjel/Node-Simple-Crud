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

router.post('/google', [
    check("id_token", "a valid token is required").not().isEmpty(),
    validateFields
],authController.googleSignIn)

module.exports = router 