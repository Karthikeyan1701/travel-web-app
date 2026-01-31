import Travel from "../models/Travel.js";

export const checkAvailability = async (travelId, travelDate) => {
    const travel = await Travel.findById(travelId);

    if (!travel) {
        throw new Error("Travel not found");
    }

    const isAvailable = travel.availableDates.some(
        (date) =>
            new Date(date).toDateString() === new Date(travelDate).toDateString()
    );

    if (!isAvailable) {
        throw new Error("Travel not available on selected date");
    }

    return travel;
};