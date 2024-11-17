const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({error : "Unauthorized access"});
        req.user = user; // Attach user to request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = authMiddleware;