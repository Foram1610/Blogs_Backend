const express = require('express')
const router = express.Router()

router.use('/api', require('./auth'))
router.use('/api/user', require('./user'))
router.use('/api/blog', require('./blog'))
router.use('/api/comment', require('./comment'))
router.use('/api/like', require('./like'))


module.exports = router;