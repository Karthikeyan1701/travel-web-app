import {
  registerUserService,
  loginUserService,
} from '../services/auth.service.js';

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

    const response = await loginUserService(email, password);

    return res.json(response);
  } catch (error) {
    next(error);
  }
};
