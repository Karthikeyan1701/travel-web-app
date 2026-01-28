import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  registerUserService,
  loginUserService,
} from '../services/auth.service.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

// User Register
export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const response = await registerUserService(email, password);

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// User Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await loginUserService(
      email,
      password,
    );

    return;
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ accessToken });
  } catch (error) {
    next(error);
  }
};

// Refresh Token Management
export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401);
      throw new Error('Refresh token missing');
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      res.status(403);
      throw new Error('Invalid refresh token');
    }

    const payload = { id: user._id };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;
    await user.save();

    return;
    res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

// User Log Out
export const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    user.refreshToken = null;
    await user.save();

    return;
    res
      .clearCookie('refreshToken')
      .status(200)
      .json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};
