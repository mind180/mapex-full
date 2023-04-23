const Comment = require('../models/Comment')

class CommentController {
    async getComments(req, res) {
        try {
            const mapId = req.params.mapId
            const comments = await Comment.find({ board: mapId })
            res.send(comments)
        } catch(e) {
            res.status(500).send({ message: 'Internal server error' })
            console.error(e);
        }
    }
}

module.exports = new CommentController()