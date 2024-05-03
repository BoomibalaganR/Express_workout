const User = require("../models/user") 
const bcrypt = require('bcryptjs');
const token  = require("../utils/token")

const createUser = async(req, res)=>{
    
    try{
        const newUser = await User.create(req.body)
        // const newUser = new User(req.body) 
        // await newUser.validate() 
        // await newUser.save() 
        return res.status(201).json(newUser)
    }catch (error) {
           return res.status(400).json({ error: error.message })
        } 
    
} 


const userLogin = async(req, res)=>{
    try{  
        const {username, password} = req.body 
        
        if (!username || !password){
            return res.status(401).json({ error: 'Username & Password Required' })
        } 

        user = await User.findOne({username: username}) 

        if (!user){
            // User not found
            return res.status(401).json({ error: 'Invalid credentials' })
        } 
        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            // Passwords don't match
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const jwtToken = token.generateToken(user._id, user.username) 
        return res.status(200).json({token: jwtToken})

    }catch(error){
        return res.status(400).json({ error: error.message })
    }
}  


const getUserById = async(req, res)=>{
    try{ 
        userID = req.params.userId 
        user = await User.findById({_id: userID}).select('-password')
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        return res.status(200).json(user)
    
    }catch(error){
        return res.status(400).json({ error: error.message })
    }
} 



module.exports = {
    createUser, 
    userLogin, 
    getUserById,
}