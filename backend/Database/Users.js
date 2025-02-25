const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
    });
// User Model
    module.exports = mongoose.model("users", userSchema);