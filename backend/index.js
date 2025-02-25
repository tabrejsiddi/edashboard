const express = require("express");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require('path');
const jwtKey = process.env.JWT_KEY;
const _dirname = path.resolve();
// Importing the database configuration & user model
require("./Database/config");
const Users = require("./Database/Users");
const Product = require("./Database/Product");

// Creating the server and it is an instance of express which is used to define routes and middlewares.
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// make routes
app.post("/register", async (req, res) => {
  // create a new user instace using the user model
  let user = new Users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went wrong ,Please try after some time" });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);

  if (req.body.password && req.body.email) {
    // 
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "Something went wrong ,Please try after some time",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No2 user found" });
    }
  } else {
    res.send({ result: "No1 user found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  console.log(result);
  res.send(result);
});

app.get("/products",verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No products found" });
  }
});

app.delete("/product/:id",verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product found" });
  }
});

app.put("/product/:id",verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// middlewares
function verifyToken(req, res, next) {
  // get token from header
  let token = req.header("Authorization");
  if (token) {
    token = token.split(" ")[1];

    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        // req.user = valid;
        next();
      }
    });
  } else {
    res.status(401).send({ result: "Please add token with header" });
  }
}
app.use(express.static(path.join(_dirname, "frontend/build")));
console.log(path.resolve(_dirname, "frontend", "build"));
app.get("*",(req,res)=>{ 
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});
const PORT =process.env.PORT || 5000;
//Middlewares
app.listen(PORT, () => {
  console.log("Server is running on port ",PORT);
});
