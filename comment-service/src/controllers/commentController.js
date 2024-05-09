const Comment = require('../models/comment') 


const createNewComment = async (req, res)=>{
    try{ 
        console.log(req.body)
        const {content, postId} = req.body  
        
        const user = JSON.parse(req.headers['user']) 
       
        const comment = await Comment.create({
            content: content, 
            post:postId, 
            user:{
                id: user.userId, 
                username: user.username
            }}) 

        console.log(comment)
        return res.status(201).json({'msg':'comment successfully created'})
    }catch(error){ 
        res.status(400).json({ error: error.message })
    }

} 

const getAllComment = async (req, res)=>{
    try{ 
        const {postId} = req.query  
        const filter = {}
        if (postId){
            filter.post = postId
        }

        const comments=  await Comment.find(filter) 
        
        // if no post available, return 404 Not Found
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'No more comments available' })
        }  

        return res.status(200).json(comments)

    }catch(err){
        res.status(500).json({message: error.message});
    }

}  

const getCommentById = async (req, res)=>{
    try{ 
        commentID = req.params.commentId 
        comment = await Comment.findById({_id: commentID}) 
        
        if (!comment || comment.length === 0) {
            return  res.status(404).json({message: 'comment not found'}) 
        }   
        
        return res.status(200).json(comment)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}  

const updateComment = async (req, res)=>{
    try {
        const updatedComment = await Comment.updateOne({
             _id: req.params.commentId  },
             req.body,
             { runValidators: true, new: true })

        if (updatedComment.matchedCount === 0) { 
            return res.status(404).json({message:'Comment not found'})
        }
        
        return res.status(200).json({message: 'Comment updated successfully'})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}   

const deleteComment = async (req, res)=>{
    try{

        commentID = req.params.commentId 
        deletedComment = await Comment.deleteOne({_id: commentID})  

        console.log('deleted-post',deletedComment)
        if (deletedComment.deletedCount === 1) {
            return res.status(200).json({message:'comment successfully deleted'})
        } 

        return res.status(404).json({message: 'Comment not found'})
    }catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ message: error.message })
    }  
} 



module.exports ={
    createNewComment,
    getAllComment, 
    getCommentById, 
    deleteComment, 
    updateComment,
}






