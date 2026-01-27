import { getTravelsService } from "../services/travel.service.js";

export const getTravels = async (req, res, next) => {
    try {
        const travels = await getTravelsService(req.query);
        return res.status(200).json(travels);
    } catch (error) {
        next(error);
    }
};
