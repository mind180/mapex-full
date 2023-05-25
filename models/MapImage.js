const { Schema, model } = require('mongoose')

const mapImageSchema = new Schema({
    value: Buffer,
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }
})

module.exports = model('MapImage', mapImageSchema)