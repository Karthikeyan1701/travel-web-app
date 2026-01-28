import express from 'express';
import { getTravels } from '../controllers/travelController.js';
import { travelQueryValidator } from '../validators/travel.validator.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { publicLimiter } from '../middleware/rateLimit.middleware.js';

const router = express.Router();

// Public
router.get('/', publicLimiter, travelQueryValidator, validateRequest, getTravels);

export default router;
