const express = require('express')
const router = express.Router()
const blog = require('../controllers/blog.controller')
const { checkBlog, valResult } = require('../middlewares/validation')
const imageMiddleware = require('../middlewares/image')
const authMiddleware = require('../middlewares/auth')

router.post('/', authMiddleware, imageMiddleware.single('image'), checkBlog, valResult, blog.addBlog)
router.put('/:id', authMiddleware, imageMiddleware.single('image'), blog.updateBlog)
router.delete('/:id', authMiddleware, blog.deleteBlog)
router.post('/getAll', authMiddleware, blog.geAllBlog)
router.post('/:id', authMiddleware, blog.getById)
router.post('/open/public', blog.geAllBlog)

module.exports = router;