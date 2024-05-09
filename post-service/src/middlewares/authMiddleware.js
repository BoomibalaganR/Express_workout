const Post = require('../models/post')


const isOwner = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const user = JSON.parse(req.headers['user'])

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        } 
      
        // check post author Id is equal to userId
        if (post.author.id.toString() !== user.userId) {
            return res.status(403).json({ 
                message: 'You do not have permission to delete this post' 
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

module.exports = {isOwner}
