const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subcategories: {
      type: Array, //each subcategory has an array of images, for example: category: t-shirt, subcategory: oversize
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
