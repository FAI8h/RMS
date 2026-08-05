import express from 'express';
import { submitBulkMarks, getResults } from '../controllers/result.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/bulk',protect, submitBulkMarks);
router.get('/',protect, getResults);

export default router;