const mongoose = require("mongoose");

// User Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String
    
});
// User Model
    module.exports = mongoose.model("products", productSchema);