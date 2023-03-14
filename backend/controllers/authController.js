const User = require('../models/User')
const Role = require('../models/Role')

class authController {
    async registration(req, res) {
        try { 
            const { email, password } = req.body
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                res.status(400).json({ message: 'User already exist' })
            }

            const user = new User({ email, password })
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error'})
        }
    }

    async login(req, res) {
        try { 

        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error'})
        }
    }

    async getUsers(req, res) {
        try {
            const adminRole = await Role.findOne({ value: 'Admin' })
            res.send(adminRole)
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = new authController()