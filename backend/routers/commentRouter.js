const { Router } = require('express')
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router({})
router.use(authMiddleware)
router.get('/maps/:mapId/comments', commentController.getComments)
router.post('/maps/:mapId/comment', commentController.saveComment)
router.delete('/maps/:mapId/comment/:commentId', commentController.deleteComment)

module.exports = router