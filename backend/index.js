let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables from .env file
let config = require("./config.json"); // Load configuration file
let mongoose = require("mongoose"); // Importing the mongoose library
let jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library
let { authenticateToken } = require("./utilities"); // Importing the authenticateToken function from utilities.js
let User = require("./models/user.model"); // Importing the User model from user.model.js
let Note = require("./models/note.model"); //  Importing the Note model from note.model.js

let app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json()); // Parse JSON request bodies

mongoose
  .connect(config.connectionString)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

//creating create account api
app.post("/api/create-account", async (req, res) => {
  const { fullname, password, email } = req.body;

  if (!fullname || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let isUser = await User.findOne({ email });

  if (isUser) {
    return res.json({ message: "User already exists", error: true });
  }

  const user = new User({
    fullname,
    password,
    email,
  });

  await user.save();

  let accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
  /*
Whats Happening above
1	Get fullname, email, and password from request body
2	Check if any field is missing
3	Check if a user with the same email already exists
4	If not, create and save a new user
5	Generate a JWT token for that user
6	Send back the user info and token as a response */
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    let user = { user: userInfo };
    let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

app.post("/api/create-note", authenticateToken, async (req, res) => {
  res.send("ALready logged in");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the API!" });
});
app.listen(1605, () => {
  console.log("Server is running on port 1605");
});
module.exports = app;
