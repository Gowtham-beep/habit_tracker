import express from 'express';
import { getHabitLogs, updateHabitLog, toggleActivity } from '../controllers/habitController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getHabitLogs);
router.put('/:date', updateHabitLog);
router.patch('/:date/toggle/:index', toggleActivity);

export default router;
