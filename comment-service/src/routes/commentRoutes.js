const express = require('express')
const router = express.Router() 

const commentController = require("../controllers/commentController")
const {isOwner} = require('../middlewares/authMiddleware')



router.post('/', commentController.createNewComment)  
router.get('/', commentController.getAllComment)
router.get('/:commentId', commentController.getCommentById)
router.patch('/:commentId', isOwner, commentController.updateComment)
router.delete('/:commentId', isOwner, commentController.deleteComment)


module.exports = router