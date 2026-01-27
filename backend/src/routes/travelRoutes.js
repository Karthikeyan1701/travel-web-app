import express from 'express';
import { getTravels } from '../controllers/travelController.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public
router.get('/', getTravels);

export default router;
