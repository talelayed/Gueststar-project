const mongoose = require("mongoose");
const validator = require("validator");

const WorkerSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    number: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    postalCode: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true,
    },
    tiktok: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Worker", WorkerSchema);
