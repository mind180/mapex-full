const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    roles: [{
        type: String,
        ref: 'Role'
    }]
})

module.exports = model('User', userSchema)