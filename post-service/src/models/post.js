const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"post title is required"]
    },
    content: {
        type: String,
        required:[true,"post content not empty"]
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true,"author of the post required"]
    },
   
},
{ timestamps: true }); 



  

module.exports = mongoose.model('Post', postSchema) 
