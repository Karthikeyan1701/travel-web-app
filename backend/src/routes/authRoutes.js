import express from 'express';
import { registerUser, loginUser, refreshAccessToken, logoutUser } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { authLimiter } from '../middleware/rateLimit.middleware.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', authLimiter, registerValidator, validateRequest, registerUser);
router.post('/login', authLimiter, loginValidator, validateRequest, loginUser);

router.post("/refresh", refreshAccessToken);

router.post("/logout", protect, logoutUser);

export default router;
