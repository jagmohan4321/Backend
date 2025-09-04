
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    pDiscription: { type: String, required: true },
    pPrice: { type: Number, required: true },
    pImage: { type: String }
});

module.exports = mongoose.model("Product", productSchema);
