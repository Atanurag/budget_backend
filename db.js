const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const connectDB = async () => {
    try {
        const uri = MONGO_URL;

        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
