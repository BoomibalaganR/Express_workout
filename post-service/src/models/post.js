const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"post title is required"]
    },
    content: {
        type: String,
        required:[true,"post content not empty"]
    },
    author:  {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
   
},
{ timestamps: true })


module.exports = mongoose.model('Post', postSchema) 
