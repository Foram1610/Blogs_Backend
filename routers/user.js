const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')
const { checkUser, valResult } = require('../middlewares/validation')
const imageMiddleware = require('../middlewares/image')
const authMiddleware = require('../middlewares/auth')

router.post('/', authMiddleware, imageMiddleware.single('avatar'), checkUser, valResult, user.addUser)
router.put('/:id', authMiddleware, imageMiddleware.single('avatar'), user.updateUser)
router.delete('/:id', authMiddleware, user.deleteUser)
router.post('/getAll', authMiddleware, user.geAllUser)
router.post('/:id', authMiddleware, user.getById)

module.exports = router;