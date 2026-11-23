import express from 'express';
import { createTeacher, getTeachers, deleteTeacher } from '../controllers/teacher.controller.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { TeacherValidator } from '../validators/teacher.validator.js';
const router = express.Router();

// All routes below require a valid JWT AND Admin role
router.route('/')
  .post(protect, adminOnly,TeacherValidator.createTeacher, createTeacher)
  .get(protect, adminOnly, getTeachers);

router.route('/:id')
  .delete(protect, adminOnly, deleteTeacher);

export default router;