const { Schema, model } = require('mongoose')

const boardSchema = new Schema({
    name: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

boardSchema.virtual('id').get(() => this._id)

boardSchema.set('toJSON', { virtuals: true });

module.exports = model('Board', boardSchema)