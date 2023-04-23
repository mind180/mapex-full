const { Router } = require('express')
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router()
router.use(authMiddleware)
router.get('/map/:mapId/comments', commentController.getComments)

module.exports = router