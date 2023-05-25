const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../configs/config')

function generateAccressToken(id, roles) {
    const payload = {
        id,
        roles 
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation error', error: errors })
            }

            const { email, password } = req.body
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(400).json({ message: 'User already exist' })
            }

            const userRole = await Role.findOne({ value: 'Admin' })
            
            const hashPassword = bcrypt.hashSync(password, 9)
            const user = new User({ email, password: hashPassword, roles: [ userRole.value ] })
            await user.save()

            const token = generateAccressToken(user._id, user.roles)
            res.json(token)
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error'})
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: 'Wrong email or password' })
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                return res.status(403).json({ message: 'Wrong email or password' })
            }

            const token = generateAccressToken(user._id, user.roles)
            res.json(token)
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find({})
            res.send(users)
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = new authController()