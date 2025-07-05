const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
});
module.exports = mongoose.model("Student", studentSchema);