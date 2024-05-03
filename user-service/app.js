const express = require('express')  
const app = express() 
const bodyParser = require('body-parser');
 
const mongoose = require( 'mongoose');
const userRoutes = require('./src/routers/userRouters')  




// connect to userDB
mongoose.connect('mongodb://localhost:27017/blog-userDB')
.then(()=>console.log('db connection established')) 
.catch((err)=>console.log(err.message)) 


// Parse JSON request bodies 
app.use(bodyParser.json()); 
app.use('/api/users', userRoutes)




// Start the server
const PORT = 8001;  
app.listen(PORT, () => {
  console.log(`user service is running on port ${PORT}`);
});