const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    text: String,
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Comment', commentSchema)