const { Schema, model } = require('mongoose')

const connectionSchema = new Schema({
    from: {
        connectionPointId: String,
        x: Number,
        y: Number,
    },
    to: {
        connectionPointId: String,
        x: Number,
        y: Number,
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }
})

module.exports = model('Connection', connectionSchema)