const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Static files
app.use(express.static("public"));

// Model
const User = require("./models/user.model");

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

console.log("NODE_ENV:", process.env.NODE_ENV);

// Connect Mongo DB
mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("Mongo DB connected"))
.catch( err => console.log("Mongo DB connection error", err))

// Routes
app.get("/", (req, res) => {
  res.render("home", {
    title: "EJS works",
    message: "If you can see this, Express + EJS is working"
  });
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("SignUp form submitted");
});

app.get("/debug/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
