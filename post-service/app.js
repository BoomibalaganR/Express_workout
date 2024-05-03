const express = require('express') 
const app = express()   
const bodyParser = require('body-parser');
 

const mongoose = require( 'mongoose');
const postRoutes = require('./src/routes/postRoutes')


// connect to mongoDB 
mongoose.connect('mongodb://localhost:27017/blog-postDB')
.then(()=>console.log('db connection established')) 
.catch((err)=>console.log(err.message)) 


// Parse JSON request bodies 
app.use(bodyParser.json()); 
app.use('api/posts', postRoutes)


// Start the server
const PORT = 8002;
app.listen(PORT, () => {
  console.log(`post-service is running on port ${PORT}`);
});