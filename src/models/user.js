const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String, // Changed to String to handle potential leading zeros
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

module.exports = User;
