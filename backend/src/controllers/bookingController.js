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

        return res.status(201).json({
            success: true,
            data: booking
        });
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

        return res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error);
    }
};