const { Router } = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router({})
router.use(authMiddleware)
router.get('/user/you', userController.getYourUser)
router.get('/user/you/avatar', userController.getUserAvatar)
router.put('/user/you', userController.updateUsername)
router.post('/user/you/avatar', userController.uploadAvatar)

module.exports = router