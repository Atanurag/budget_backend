const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri =
            "mongodb+srv://meuser:hello@cluster0.gu3dwup.mongodb.net/?retryWrites=true&w=majority";

        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
