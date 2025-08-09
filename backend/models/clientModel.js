const mongoose = require("mongoose");
const validator = require("validator");

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String
    },
    postalCode: {
        type: String
    },
    instagram: {
      type: String,
    },
    tiktok: {
      type: String,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
