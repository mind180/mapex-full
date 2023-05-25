const { Router } = require('express')
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = new Router()
router.post('/registration', [
    check('email', 'Invalid email format').isEmail(),
    check('password', 'Length must be from 8 to 16').isLength({ min: 8, max: 16 })
], authController.registration)
router.get('/users', roleMiddleware([ 'Admin' ]), authController.getUsers)
router.post('/login', authController.login)

module.exports = router