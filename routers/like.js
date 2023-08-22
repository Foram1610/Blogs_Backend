const express = require('express')
const router = express.Router()
const like = require('../controllers/like.controller')
const authMiddleware = require('../middlewares/auth')

router.post('/', authMiddleware,  like.addLike)
router.put('/:id', authMiddleware,  like.updateLike)
router.delete('/:id', authMiddleware, like.deleteLike)
router.post('/getAll', like.getAllLikes)
router.post('/:id', authMiddleware, like.getById)

module.exports = router;