import rateLimit from "express-rate-limit";

// Auth (Login & Register)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 requests per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many auth attempts. Please try again later."
});

// Booking (creation & cancellation)
export const bookingLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many booking requests. Please slow down."
});

// Public APIs (read-only)
export const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
});