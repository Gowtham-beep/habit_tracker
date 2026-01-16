import express from 'express';
import { getSchedules, updateSchedule } from '../controllers/scheduleController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getSchedules);
router.put('/:type', updateSchedule);

export default router;
