import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  bookTravel,
  cancelTravelBooking,
} from '../controllers/bookingController.js';
import { cancelBookingValidator, createBookingValidator } from '../validators/booking.validator.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { bookingLimiter } from '../middleware/rateLimit.middleware.js';

const router = express.Router();

router.post('/', bookingLimiter, protect, createBookingValidator, validateRequest, bookTravel);
router.patch('/:id/cancel', bookingLimiter, protect, cancelBookingValidator, validateRequest, cancelTravelBooking);

export default router;
