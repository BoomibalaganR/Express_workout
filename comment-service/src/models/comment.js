const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Comment should not be empty"]
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Post ID required"]
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)
