const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware'); 
const {isAuthenticated} = require('./src/middlewares/authMiddleware')

const app = express();   



//proxy routes for each service 
app.use('/api/users', createProxyMiddleware({ 
  target: 'http://127.0.0.1:8001/api/users', 
  changeOrigin: true 
}));

app.use('/api/posts', isAuthenticated, createProxyMiddleware({
  target: 'http://127.0.0.1:8002/api/posts',
  changeOrigin: true, 
 
  }));

app.use('/api/comments', isAuthenticated, createProxyMiddleware({ 
  target: 'http://127.0.0.1:8003/api/comments', 
  changeOrigin: true 
}));



// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
