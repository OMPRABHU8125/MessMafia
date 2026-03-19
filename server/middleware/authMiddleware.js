const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Received Token:', token);
      console.log('Secret Used:', process.env.NEXTAUTH_SECRET);

      // Decode token using NEXTAUTH_SECRET as requested
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

      // NextAuth tokens usually contain email/name or sub
      // We'll search for the user by email from the decoded token
      req.user = await User.findOne({ email: decoded.email }).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error.message);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
