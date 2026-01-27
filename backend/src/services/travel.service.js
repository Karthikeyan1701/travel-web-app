import Travel from '../models/Travel.js';

/**
 * GET /api/travels
 * Public
 * Query Parameters:
 *      - destination
 *      - minPrice
 *      - maxPrice
 *      - rating
 */

export const getTravelsService = async (filters) => {
  const { destination, minPrice, maxPrice, rating } = filters;
  const query = {};

  if (destination) {
    query.destination = { $regex: destination, $options: 'i' };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (rating) {
    query.rating = { $gte: Number(rating) };
  }

  return Travel.find(query).sort({ createdAt: -1 });
};
