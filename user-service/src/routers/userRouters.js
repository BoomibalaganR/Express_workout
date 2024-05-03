const express= require('express') 

const router = express.Router()  
const userController  = require("../controllers/userController")



router.post("/",userController.createUser) 
router.post("/login",userController.userLogin) 
router.get("/:userId",userController.getUserById)


module.exports = router