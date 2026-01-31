import Travel from '../models/Travel.js';
import { getPagination } from '../utils/pagination.js';

export const getTravelsService = async (queryParams) => {
  const { page, limit, skip } = getPagination(queryParams);
  const filter = {};

  if (queryParams.minPrice || queryParams.maxPrice) {
    filter.price = {};
    if (queryParams.minPrice) filter.price.$gte = Number(queryParams.minPrice);
    if (queryParams.maxPrice) filter.price.$lte = Number(queryParams.maxPrice);
  }

  if (queryParams.rating) {
    filter.rating = Number(queryParams.rating);
  }

  const allowedSortFields = ['price', 'rating', 'createdAt'];
  if (queryParams.sort && !allowedSortFields.includes(queryParams.sort)) {
    throw new Error('Invalid sort field');
  }

  const sortField = queryParams.sort || 'createdAt';

  const sortOrder =
    queryParams.order === 'asc' ? 1 : queryParams.order === 'desc' ? -1 : -1;

  const total = await Travel.countDocuments(filter);

  const data = await Travel.find(filter)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
