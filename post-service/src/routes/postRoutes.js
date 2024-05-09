const express = require('express')
const router = express.Router() 

const postController = require("../controllers/postController")
const {isOwner} = require('../middlewares/authMiddleware');




router.post('/', postController.createNewPost)  
router.get('/', postController.getAllPost)
router.get('/:postId', postController.getPostById)

router.patch('/:postId', isOwner, postController.updatePost)
router.delete('/:postId', isOwner, postController.deletePost)


module.exports = router