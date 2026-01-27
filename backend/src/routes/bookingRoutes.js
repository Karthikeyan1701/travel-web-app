import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  bookTravel,
  cancelTravelBooking,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', protect, bookTravel);
router.patch('/:id/cancel', protect, cancelTravelBooking);

export default router;
