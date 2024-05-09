const jwt = require('jsonwebtoken');
const SECRET_KEY = "@blog_api_secret_ey" 



const isAuthenticated = (req, res, next) => {   
    if (req.method == "GET"){
        return next()
    }
    
    // Extract token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    try {
        // If token is missing, return unauthorized
        if (!token) { 
            return res.status(401).json({ error: 'Unauthorized user: Token is missing' })
        }

        // Verify token
        jwt.verify(token, SECRET_KEY, (err, user) => {
            // If verification fails, return unauthorized
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Unauthorized user: Token has expired' })
       
                } else {
                    return res.status(403).json({ error: 'Forbidden: Invalid token' })
       
                }
            }
            console.log("user",user)
            // User is authenticated, attach user to request header 
            req.headers['user'] = JSON.stringify(user); 
            
            next();
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { isAuthenticated }
