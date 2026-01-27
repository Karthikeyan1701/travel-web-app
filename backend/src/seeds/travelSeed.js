import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from "../config/db.js"

import Travel from "../models/Travel.js";

dotenv.config();

const travels = [
    {
        destination: "Paris",
        price: 1200,
        rating: 5,
        availableDates: ["2026-02-10", "2026-03-15"]
    },
    {
        destination: "Rome",
        price: 900,
        rating: 4,
        availableDates: ["2026-03-12", "2026-04-02"]
    },
    {
        destination: "Bali",
        price: 1500,
        rating: 5,
        availableDates: ["2026-04-13", "2026-05-01"]
    },
    {
        destination: "Dubai",
        price: 1100,
        rating: 4,
        availableDates: ["2026-04-28", "2026-05-31"]
    }
];

const seedTravels = async () => {
    try {
        await connectDB();

        await Travel.deleteMany();
        console.log("Existing travels cleared");

        await Travel.insertMany(travels);
        console.log("Travel data seeded successfully");

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedTravels();
