
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    verifyUser: { type: Boolean, required: true, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
