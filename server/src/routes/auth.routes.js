import express from 'express';
import { login, logout, getCurrentUser } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/me',protect,getCurrentUser);
router.post('/login', login);
router.post('/logout', logout);

export default router;