const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check for JWT
const authenticateToken = (req, res, next) => {
    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (token == null) return res.status(200).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(200).json({ message: 'Invalid token' });
        req.user = user; // Attach the user information to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
