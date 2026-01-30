import { getTravelsService } from "../services/travel.service.js";

export const getTravels = async (req, res, next) => {
    try {
        const travels = await getTravelsService(req.query);

        return res.status(200).json({
            success: true,
            data: travels.data,
            meta: travels.meta
        });
    } catch (error) {
        next(error);
    }
};
