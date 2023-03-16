const { Schema, model } = require('mongoose')

const boardSchema = new Schema({
    name: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Board', boardSchema)