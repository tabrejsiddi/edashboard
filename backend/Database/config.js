const mongoose = require("mongoose");
require("dotenv").config();
//Database connection
// 
//  mongoose.connect("mongodb+srv://tabrejsiddi5:nEai7gg0Euy8bXPG@cluster0.cg8p7.mongodb.net/e-commerce-db?retryWrites=true&w=majority&appName=Cluster0");
 mongoose.connect(process.env.URL);