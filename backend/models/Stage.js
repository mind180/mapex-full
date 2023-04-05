const { Schema, model } = require('mongoose')

const stageSchema = new Schema({
    data: {
        title: String,
        color: String
    },
    position: {
        x: Number,
        y: Number,
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }
})

stageSchema.virtual('id').get(() => this._id)

stageSchema.set('toJSON', { virtuals: true });

module.exports = model('Stage', stageSchema)