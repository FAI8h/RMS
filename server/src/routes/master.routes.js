import express from 'express';
import { getClasses, getSubjects, getExams } from '../controllers/master.controller.js';
import { protect,adminOnly } from '../middlewares/auth.js';

import { createClass,removeClass,createSection, getSections } from '../controllers/class.controller.js';
import { ValidateClass } from '../validators/class.validator.js';
const router = express.Router();

// All routes are protected
router.route('/classes')
  .get(protect, getClasses)
  .post(protect, adminOnly, ValidateClass.createClass, createClass)
  .delete(protect, adminOnly, ValidateClass.removeClass, removeClass);
router.route('/sections')
  .get(protect, ValidateClass.getSections,getSections)
  .post(protect, adminOnly, ValidateClass.createSection, createSection);
router.get('/subjects',protect, getSubjects);
router.get('/exams',protect, getExams);

export default router;
