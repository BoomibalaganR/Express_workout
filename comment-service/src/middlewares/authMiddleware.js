const Comment = require('../models/comment')

const isOwner = async (req, res, next) => {
    try {
        const commentId = req.params.commentId
        const user = JSON.parse(req.headers['user'])

        const comment = await Comment.findById(commentId)

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        // comment user is equal to userId
        if (comment.user.id.toString() !== user.userId) {
            return res.status(403).json({ 
                message: 'You do not have permission to delete this comment' 
            });
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {isOwner}
