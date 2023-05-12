const { Schema, model } = require('mongoose')

const commentLikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }
})

module.exports = model('CommentLike', commentLikeSchema)