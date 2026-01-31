import Booking from "../models/Booking.js";
import Travel from "../models/Travel.js";
import { checkAvailability } from "./availability.service.js";
import { calculatePrice } from "./pricing.service.js";

export const createBooking = async (userId, travelId, travelDate) => {
    const travel = await checkAvailability(travelId, travelDate);

    const finalPrice = calculatePrice(travel.price);

    const booking = await Booking.create({
        user: userId,
        travel: travelId,
        travelDate,
        price: finalPrice,
        status: "CONFIRMED"
    });

    return booking;
};