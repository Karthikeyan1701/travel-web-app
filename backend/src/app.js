import express from 'express';
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js";
import travelRoutes from "./routes/travelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Global middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:6172"],
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/travels", travelRoutes);
app.use("/api/bookings", bookingRoutes);

// Error Handler
app.use(errorHandler);

export default app;