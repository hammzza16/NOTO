let mongoose = require("mongoose");
let schema = mongoose.Schema; // Importing the mongoose library and creating a schema object
// Creating a new schema for the user model
// shema is a blueprint for the user document in the MongoDB database
// The schema defines the structure of the user document in the MongoDB database
// The schema has the following fields:
// fullname: The full name of the user, required and unique
// password: The password of the user, required
// email: The email of the user, required and unique
// createdon: The date when the user was created, default is the current date and time
// createdAt: The date when the user was created, default is the current date and time
// updatedAt: The date when the user was last updated, default is the current date and time
// The schema is then exported as a model named "User" using the mongoose.model() function
//using the userSchema a new user document can be created in the MongoDB database
let userSchema = new schema({
  fullname: { type: String },
  password: { type: String },
  email: { type: String },
  createdon: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("User", userSchema);
