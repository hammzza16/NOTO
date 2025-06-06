let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables from .env file
let config = require("./config.json"); // Load configuration file
let mongoose = require("mongoose"); // Importing the mongoose library
let jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library
let { authenticateToken, summarizeText } = require("./utilities"); // Importing the authenticateToken function from utilities.js
let User = require("./models/user.model"); // Importing the User model from user.model.js
let Note = require("./models/note.model"); //  Importing the Note model from note.model.js

let app = express();

const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "https://notoapp.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

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

app.post("/api/summarize-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note)
      return res.status(404).json({ error: true, message: "Note not found" });

    const summary = await summarizeText(note.content);
    note.summary = summary;
    await note.save();

    res.json({ error: false, summary });
  } catch (err) {
    res.status(500).json({ error: true, message: "Failed to summarize note" });
  }
});

app.post("/api/add-note", authenticateToken, async (req, res) => {
  let { title, content, tags } = req.body;
  let { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal Server error",
    });
  }
});

app.put("/api/edit-note/:noteId", authenticateToken, async (req, res) => {
  let noteId = req.params.noteId;
  let { title, content, tags, isPinned } = req.body;
  let { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No Changes Provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.get("/api/get-all-notes/", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.delete("/api/delete-note/:noteId", authenticateToken, async (req, res) => {
  let noteID = req.params.noteId;
  let { user } = req.user;
  try {
    let note = await Note.findOne({ _id: noteID, userId: user._id });
    //console.log(note);
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    await Note.deleteOne({ _id: noteID, userId: user._id });
    return res.json({ error: false, message: "Note Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server error" });
  }
});

app.put(
  "/api/update-note-pinned/:noteId",
  authenticateToken,
  async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });

      if (!note) {
        return res.status(404).json({ error: true, message: "Note not found" });
      }

      note.isPinned = isPinned;

      await note.save();

      return res.json({
        error: false,
        note,
        message: "Note updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  }
);

app.get("/api/get-user/", authenticateToken, async (req, res) => {
  const { user } = req.user;
  console.log(user);
  let isUser = await User.findOne({ _id: user._id });
  console.log(isUser);
  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    error: false,
    message: "User Found",
    name: isUser.fullname,
    email: isUser.email,
    id: isUser._id,
  });
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
