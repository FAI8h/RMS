import express from 'express';
import { getClasses, getSections, getSubjects, getExams } from '../controllers/master.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// All routes are protected
router.get('/classes',protect, getClasses);
router.get('/sections',protect, getSections);
router.get('/subjects',protect, getSubjects);
router.get('/exams',protect, getExams);

export default router;