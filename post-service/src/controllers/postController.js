const Post = require("../models/post") 


const createNewPost = async (req, res)=>{ 
    try{
        const {title, content} = req.body 
        const user = JSON.parse(req.headers['user']); 

        await Post.create({
            title, 
            content, 
            author:{
                id: user.userId, 
                username:user.username
            }}) 

        return res.status(201).json({'msg':'successfully created'})
    } catch (error) { 
        // return 400 
        res.status(400).json({ error: error.message })
    }  
}  



const getAllPost = async (req, res)=>{ 
   
    try{
        const posts=  await Post.find() 
        // if no post available, return 404 Not Found
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No more post available' });
        }

        // If posts are found, return a 200 OK response with the posts
        return res.status(200).json(posts)
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ message: error.message })
    } 
    }


const getPostById = async (req, res)=>{
    try{
        postID = req.params.postId 
        post = await Post.findById({_id: postID}) 
        
        if (!post || post.length === 0) {
            return  res.status(200).json({message: 'post not found'}) 
        }  
        
        // If posts are found, return a 200 OK response with the posts
        return res.status(200).json(post)
       
    }catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ message: error.message })
    } 

} 

const deletePost = async(req, res)=>{
    try{

        postID = req.params.postId 
        deletedPost = await Post.deleteOne({_id: postID})  

        console.log('deleted-post',deletedPost)
        if (deletedPost.deletedCount === 1) {
            return res.status(200).json({message:'successfully deleted'})
        } 

        return res.status(404).json({message: 'Post not found'})
    }catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ message: error.message })
    }  
}  


const updatePost= async(req, res)=>{
    try {
        const updatedPost = await Post.updateOne({
             _id: req.params.postId  },
             req.body,
             { runValidators: true })

        if (updatedPost.matchedCount === 0) { 
            return res.status(404).json({message:'Post not found'})
        }
        return res.status(200).json({message: 'Post updated successfully'})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
} 
 


module.exports = { 
    createNewPost,
    getAllPost, 
    getPostById, 
    deletePost, 
    updatePost,
}