const { Router } = require('express')
const router = Router()
const controllerBrowser = require('../controllers/browser.controller')


router.get('/:collection/:term', controllerBrowser.search) 


module.exports = router