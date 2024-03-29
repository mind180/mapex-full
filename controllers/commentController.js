const Comment = require('../models/Comment');
const User = require('../models/User');

class CommentController {
    async getComments(req, res) {
        try {
            const mapId = req.params.mapId
            const allComments = await Comment.find({ board: mapId }).populate('user', 'username')
            const comments = {}
            comments.my = allComments.filter(comment => comment.user._id == req.user.id)
            comments.others = allComments.filter(comment => comment.user._id != req.user.id)
            res.send(comments)
        } catch(e) {
            res.status(500).send({ message: 'Internal server error' })
            console.error(e);
        }
    }

    async saveComment(req, res) {
        try {
            const mapId = req.params.mapId
            const commentText = req.body.text
            const newComment = new Comment({
                text: commentText,
                board: mapId,
                user: req.user.id,
                date: Date.now()
            })
            await newComment.save()
            const comentedUser = await User.findById(req.user.id).select('username')
            newComment.user = comentedUser
            res.send(newComment)
        } catch(e) {
            res.status(500).send({ message: 'Internal server error' })
            console.error(e);
        }
    }

    async deleteComment(req, res) {
        try {
            const commentId = req.params.commentId
            const comment = await Comment.findById(commentId)
            if (comment.user != req.user.id) {
                return res.status(403).json({ message: 'You dont have access' })
            }
            await Comment.findByIdAndDelete(commentId)
            res.json({ message: 'deleted' })
        } catch(e) {
            res.status(500).send({ message: 'Internal server error' })
            console.error(e);
        }
    }
}

module.exports = new CommentController()