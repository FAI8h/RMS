import jwt from jsonwebtoken
import Teacher from "../models/teacher.js";
import Admin from "../models/admin.js";

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      
      // Attach user to request (check both Admin and Teacher collections)
      let user = await Admin.findById(decoded.id).select('-password') || 
                 await Teacher.findById(decoded.id).select('-password');
                 
      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to restrict routes to Admins only
const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'Admin' || req.user.role === 'Super-Admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

export{ protect, adminOnly };