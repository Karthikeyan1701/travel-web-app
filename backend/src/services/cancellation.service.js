import Booking from "../models/Booking.js";

export const cancelBooking = async (bookingId, userId) => {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.user.toString() !== userId.toString()) {
        throw new Error("Not authorized to cancel this booking");
    }

    if (booking.status === "COMPLETED") {
        throw new Error("Completed booking cannot be cancelled");
    }

    booking.status = "CANCELLED";
    await booking.save();

    return booking;
};