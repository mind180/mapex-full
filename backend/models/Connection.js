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

connectionSchema.virtual('id').get(() => this._id)

connectionSchema.set('toJSON', { virtuals: true });

module.exports = model('Connection', connectionSchema)