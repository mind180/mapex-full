const { Router } = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router({})
router.use(authMiddleware)
router.get('/user/you', userController.getYourUser)
router.put('/user/you', userController.updateUsername)


module.exports = router