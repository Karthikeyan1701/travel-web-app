import Travel from "../models/Travel.js";

export const checkAvailability = async (travelId, travelDate) => {
    const travel = await Travel.findById(travelId);

    if (!travel) {
        throw new Error("Travel not found");
    }

    if (!travel.availableDates.includes(travelDate)) {
        throw new Error("Travel not available on selected date");
    }

    return true;
};