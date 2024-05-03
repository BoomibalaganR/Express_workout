const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    
    content: {
        type: String,
        required:[true,"comment should not empty"]
    },
    user: {
        type: mongoose.Types.ObjectId, 
        immutable: true
    }, 
    post: {
        type: mongoose.Types.ObjectId,
        required: [true,"post ID required"], 
        immutable: true
    },
   
},
{ timestamps: true }); 



  

module.exports = mongoose.model('Comment', commentSchema) 
