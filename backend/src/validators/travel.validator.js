import { query } from 'express-validator';

export const travelQueryValidator = [
  query('minPrice')
    .optional()
    .isNumeric()
    .withMessage('minPrice must be a number'),
  query('maxPrice')
    .optional()
    .isNumeric()
    .withMessage('maxPrice must be a number'),
  query('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('rating must be between 1 amd 5'),
];
