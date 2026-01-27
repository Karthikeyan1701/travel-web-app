import mongoose from "mongoose";

const travelSchema = new mongoose.Schema(
    {
        destination: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        price: {
            type: Number,
            required: true,
            index: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            index: true
        },
        availableDates: {
            type: [String],
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Travel", travelSchema);