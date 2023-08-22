const express = require('express')
const router = express.Router()
const comment = require('../controllers/comment.controller')
const authMiddleware = require('../middlewares/auth')

router.post('/', authMiddleware, comment.addComment)
router.put('/:id', authMiddleware, comment.updateComment)
router.delete('/:id', authMiddleware, comment.deleteComment)
router.post('/getAll', authMiddleware, comment.geAllComments)
router.post('/:id', authMiddleware, comment.getById)

module.exports = router;