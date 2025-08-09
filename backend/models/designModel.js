const mongoose = require("mongoose");

const DesignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    linkedProduct: { 
      type: String, 
      // ref: "Product", 
      required: true 
    },
    price: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    theme: {
      type: String,
      required: true,
    },
    imgs: {
      type: Array,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Array,
      required: true
    },
    rate: {
        type: Number,
        default: 5
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Design", DesignSchema);
