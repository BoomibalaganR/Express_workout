const Post = require("../models/post") 
const axios = require('axios');



const createNewPost = async (req, res)=>{ 
    try{
        const {title, content} = req.body 
        const author = req.user.id; 

        await Post.create({title, content, author}) 

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

        // Fetch author details for each post from the user service
        const postsWithUsers = await Promise.all(posts.map(async (post) => { 
            
            try{
                const userResponse = await axios.get(`http://127.0.0.1:8001/api/users/${post.author}`);
                const user = userResponse.data;
                return { ...post.toObject(), author: user }; // Combine post data with user details

            }catch (error) {
                // Handle error when fetching user details
                console.error('Error fetching user details for post:', error);
                // return author null
                return { ...post.toObject(), author: null };
            }
        })); 

        // If posts are found, return a 200 OK response with the posts
        return res.status(200).json(postsWithUsers)
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ message: error.message });
    } 
    }


const getPostById = async (req, res)=>{
    try{
        postID = req.params.postId 
        post = await Post.findById({_id: postID}) 
        
        if (!post || post.length === 0) {
            return  res.status(200).json({message: 'post not found'}) 
        }  
        
        // Fetch author details for a post from the user service
        try{
            const userResponse = await axios.get(`http://127.0.0.1:8001/api/users/${post.author}`);
            const user = userResponse.data;
            
            postWithUser =  { ...post.toObject(), author: user }; // Combine post data with user details 
        }catch (error) {
            // Handle error when fetching user details
            console.error('Error fetching user details for post:', error);
            //  return null or an empty object for the user in case of error
            postWithUser = { ...post.toObject(), author: null };
        } 
        
        // If posts are found, return a 200 OK response with the posts
        return res.status(200).json(postWithUser);
       
    }catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ message: error.message });
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

        return res.status(404).json({message: 'Post not found'});
    }catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ message: error.message });
    }  
}  


const updatePost= async(req, res)=>{
    try {
        const updatedPost = await Post.updateOne({
             _id: req.params.postId  },
             req.body,
             { runValidators: true });

        if (updatedPost.matchedCount === 0) { 
            return res.status(404).json({message:'Post not found'});
        }
        return res.status(200).json({message: 'Post updated successfully'});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
} 
 


module.exports = { 
    createNewPost,
    getAllPost, 
    getPostById, 
    deletePost, 
    updatePost,
}