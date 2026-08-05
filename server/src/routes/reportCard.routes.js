import express from 'express';
import { submitReportCardData, getFullReportCard } from '../controllers/reportCard.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/',protect, submitReportCardData);
router.get('/:studentId',protect, getFullReportCard);

export default router;