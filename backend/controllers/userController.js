const User = require('../models/User')

class UserController {
    async getYourUser(req, res) {
        try {
            const userId = req.user.id
            const user = await User.findById(userId).select('username email')
            res.send(user)
        } catch(e) {
            console.error(e);
        }
    }

    async updateUsername(req, res) {
        try {
            const username = req.body.username
            await User.findByIdAndUpdate(req.user.id, { username })
            res.status(200).json({ message: 'Updated succesfully' })
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = new UserController()