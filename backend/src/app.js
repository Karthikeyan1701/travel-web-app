import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import travelRoutes from './routes/travelRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { requestLogger } from './middleware/logger.middleware.js';

const app = express();

// Global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Local Front end
      'https://your-frontend-domain.com', // Production front end
    ],
    credentials: true,
  }),
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/travels', travelRoutes);
app.use('/api/bookings', bookingRoutes);

// Error Handler
app.use(errorHandler);

export default app;