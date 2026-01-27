import { createBooking } from "../services/booking.service.js";
import { cancelBooking } from "../services/cancellation.service.js";

export const bookTravel = async (req, res, next) => {
    try {
        const { travelId, travelDate } = req.body;

        const booking = await createBooking(
            req.user._id,
            travelId,
            travelDate
        );

        return res.status(201).json(booking);
    } catch (error) {
        next(error);
    }
};

export const cancelTravelBooking = async (req, res, next) => {
    try {
        const booking = await cancelBooking(
            req.params.id,
            req.user._id
        );

        return res.json(booking);
    } catch (error) {
        next(error);
    }
};