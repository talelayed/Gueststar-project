const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    fournisseur: {
      type: String,
      required: true
    },
    purchase: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    imgs: {
      type: Array,
      required: true,
    },
    pack: {
      type: Array
    },
    colorsAndSizes: {
      type: Object,
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

module.exports = mongoose.model("Product", ProductSchema);
