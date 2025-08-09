const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // clientId: {
    //   type: String,
    //   ref: "Client"
    // },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
    },
    number: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    notes: {
      type: String
    },
    status: {
      type: String,
      enum: ["reçu", "tirage_film", "prêt"],
      default: "reçu",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
