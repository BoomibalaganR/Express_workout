const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true 
    }, 
    name:{
      type: String,
      default: null
    },
    password: {
        type: String, 
        required: true
    }, 
},
{ timestamps: true })


// Before saving the user to the database, hash the password
userSchema.pre('save', async function(next) {
  
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
      next()

    } catch (error) {
      next(error)
    }
  })
  

module.exports = mongoose.model('User', userSchema)
