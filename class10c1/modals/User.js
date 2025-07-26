const { verify } = require("crypto");
const mongoose = require("mongoose");
const { type } = require("os");
const userSchema = new mongoose.Schema({
    uName: { type: String, required: true },
    uEmail: { type: String, required: true },
    uPass: { type: String, required: true },
    verifyUser: { type: Boolean, default: false },
    otp: { type: String },
    role: { type: String, enum: ["student", "teacher"], default: "student" },
})
module.exports = mongoose.model("User", userSchema);