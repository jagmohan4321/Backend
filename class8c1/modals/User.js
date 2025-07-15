const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    uName: { type: String, required: true },
    uEmail: { type: String, required: true },
    uPass: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher"], default: "student" },
})
module.exports = mongoose.model("User", userSchema);