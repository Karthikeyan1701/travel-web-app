import { body, param } from "express-validator";
import mongoose from "mongoose";

export const createBookingValidator = [
    body("travelId")
        .custom(v => mongoose.Types.ObjectId.isValid(v))
        .withMessage("Invalid travelId"),
    body("travelDate").notEmpty().withMessage("Travel date is required"),
];

export const cancelBookingValidator = [
    param("id")
    .custom(v => mongoose.Types.ObjectId.isValid(v))
    .withMessage("Invalid booking id"),
];