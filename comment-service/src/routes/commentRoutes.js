const express = require('express')
const router = express.Router() 

const commentController = require("../controllers/commentController")
// const authenticateUser = require('../middlewares/authenticateUser');

const addUserId = (req, res, next)=>{
    req.user = {id: '663345cb6a453b0b4155351d' }
    next()
}

router.post('/', addUserId, commentController.createNewComment)  
router.get('/', commentController.getAllComment)
router.get('/:commentId', commentController.getCommentById)
router.patch('/:commentId', commentController.updateComment)
router.delete('/:commentId', commentController.deleteComment)


module.exports = router