const jwt = require('jsonwebtoken');

const SECRET_KEY = "@blog_api_secret_ey" 


// Function to generate JWT token
const generateToken = (userId, username) => {
    // Define payload with user ID and username
    const payload = {
        userId: userId,
        username: username
    };

    // Sign the payload with a secret key to generate JWT token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1m' }); 
    return token;
}; 


module.exports = {generateToken}