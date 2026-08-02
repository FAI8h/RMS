import express from 'express';
import { getStudents } from '../controllers/student.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Apply auth middleware to all student routes
// A valid JWT (Admin or Teacher) is required to access this
router.get('/',protect, getStudents);

export default router;