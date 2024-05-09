const express = require('express') 
const app = express()   
const bodyParser = require('body-parser')
 

const mongoose = require( 'mongoose')
const commentRoutes = require('./src/routes/commentRoutes')


// connect to mongoDB 
mongoose.connect('mongodb://localhost:27017/blog-commentDB')
.then(()=>console.log('db connection established')) 
.catch((err)=>console.log(err.message)) 


// Parse JSON request bodies 
app.use(bodyParser.json())
app.use('/api/comments', commentRoutes)


// Start the server
const PORT = 8003
app.listen(PORT, () => {
  console.log(`comment-service is running on port ${PORT}`)
})