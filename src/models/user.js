const { ref } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

module.exports = User;
