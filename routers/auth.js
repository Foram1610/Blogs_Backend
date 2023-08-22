const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
const auth = require('../controllers/auth.controller')
const { checkUser, login, valResult } = require('../middlewares/validation')
const imageMiddleware = require('../middlewares/image')
const authMiddleware = require('../middlewares/auth')

router.post('/registration', imageMiddleware.single('avatar'), checkUser, valResult, user.addUser)
router.post('/login', login, valResult, auth.login)
router.get('/me', authMiddleware, auth.me)

module.exports = router;