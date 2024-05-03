const express = require('express')
const router = express.Router() 

const postController = require("../controllers/postController")
// const authenticateUser = require('../middlewares/authenticateUser');


// add user detail into request header after the authentication 
// now hard coded the user for testing..
const addUserId = (req, res, next)=>{
    req.user = {id: '663345cb6a453b0b4155351d' }
    next()
}

router.post('/', addUserId, postController.createNewPost)  
router.get('/', postController.getAllPost)
router.get('/:postId', postController.getPostById)
router.patch('/:postId', postController.updatePost)
router.delete('/:postId', postController.deletePost)


module.exports = router