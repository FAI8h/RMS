import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.js';
import Teacher from '../models/teacher.js';

// @desc    Login user (Admin or Teacher)
// @route   POST /api/auth/login
// @access  Public

const options = {
  httpOnly: true,
  // Browsers reject Secure cookies over plain HTTP, so only enable it in
  // production (where the API should be served over HTTPS).
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};
export const login = async (req, res) => {
  try {
    const { email, password, name, accessCode } = req.body;

    // --- Teacher Login Flow (Passwordless) ---
    if (name && accessCode) {
      const teacher = await Teacher.findOne({ name, accessCode });

      if (!teacher) {
        return res.status(401).json({ message: 'Invalid name or access code' });
      }

      const token = jwt.sign(
        { id: teacher._id, role: teacher.role },
        process.env.ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_EXPIRY }
      );

      return res
        .status(200)
        .cookie("accessToken",token,options)
        .json({
        _id: teacher._id,
        name: teacher.name,
        role: teacher.role
      });
    }

    // --- Admin Login Flow ---
    if (email && password) {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_EXPIRY }
      );

      return res
        .status(200)
        .cookie('accessToken', token, options)
        .json({
          _id: admin._id,
          name: admin.name,
          role: admin.role,
        });
    }

    // If neither flow is triggered
    return res.status(400).json({ message: 'Please provide valid login credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
