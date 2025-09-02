
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    otp: { type: String },
    verifyUser: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["admin", "student", "teacher"], // allowed values
        default: "student"
    },
    
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
