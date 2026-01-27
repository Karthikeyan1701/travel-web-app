import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const registerUserService = async (email, password) => {
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({ email, password });

  return {
    id: user._id,
    email: user.email,
    token: generateToken(user._id),
  };
};

export const loginUserService = async (email, password) => {
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user._id,
    email: user.email,
    token: generateToken(user._id),
  };
};
