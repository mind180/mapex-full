const { Schema, model } = require('mongoose')

const userAvatarSchema = new Schema({
    value: Buffer,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('UserAvatar', userAvatarSchema)