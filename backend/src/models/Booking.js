import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        travel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Travel",
            required: true
        },
        travelDate: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
            default: "PENDING"
        }
    }, 
    { timestamps: true}
);

export default mongoose.model("Booking", bookingSchema);