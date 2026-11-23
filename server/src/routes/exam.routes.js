import express from 'express';
import { createExam, updateExamStatus } from '../controllers/exam.controller.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { ExamValidaotr } from '../validators/exam.validator.js';

const router = express.Router();

router.route('/')
.post(protect, adminOnly, ExamValidaotr.createExam, createExam)
router.route('/:eId')
.patch(protect, adminOnly, ExamValidaotr.updateStatus, updateExamStatus);
export default router;
