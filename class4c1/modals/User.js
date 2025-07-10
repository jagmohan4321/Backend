const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    uName: { type: String },
    uEmail: { type: String },
    uPass: { type: String }


})

module.exports = mongoose.model("User", userSchema);