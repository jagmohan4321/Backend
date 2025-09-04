
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryDiscription: { type: String, required: true },
    product: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    ]
});

module.exports = mongoose.model("Category", categorySchema);
