const User = require('../models/User')
const UserAvatar = require('../models/UserAvatar')

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

    async uploadAvatar(req, res) {
        try {
            const userId = req.user.id
            const userAvatarBuffer = req.body
            const avatar = { $set: { value: userAvatarBuffer } }
            await UserAvatar.updateOne({ user: userId }, avatar, { upsert: true })
            res.status(200).json({ message: 'Uploaded succesfully' })
        } catch(e) {
            console.error(e);
        }
    }

    async getMyAvatar(req, res) {
        try {
            const userId = req.user.id
            const userAvatar = await UserAvatar.findOne({ user: userId }).select('value')
            if (!userAvatar) {
                return res.status(404).json({ message: 'Image is not found' })
            }
            res.set('Content-Type', 'image/png');
            res.send(userAvatar.value)
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async getUserAvatar(req, res) {
        try {
            const userId = req.params.userId
            const userAvatar = await UserAvatar.findOne({ user: userId }).select('value')
            if (!userAvatar) {
                return res.status(404).json({ message: 'Image is not found' })
            }
            res.set('Content-Type', 'image/png');
            res.send(userAvatar.value)
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new UserController()