const RecommendedProduct = require("../models/recommendedProductModel");

// Get all recommended products (with product details)
const getAllRecommendedProducts = async (req, res) => {
  try {
    const recommended = await RecommendedProduct.find().populate("productId");
    res.status(200).json({ recommended });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one recommended product by ID
const getRecommendedProduct = async (req, res) => {
  try {
    const recommended = await RecommendedProduct.findById(req.params.id).populate("productId");
    if (!recommended) {
      return res.status(404).json({ message: "Recommended product not found" });
    }
    res.status(200).json({ recommended });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new recommended product
const createRecommendedProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const newRecommended = new RecommendedProduct({ productId });
    await newRecommended.save();
    res.status(201).json({ recommended: newRecommended, message: "Recommended product added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update recommended product
const updateRecommendedProduct = async (req, res) => {
  try {
    const updated = await RecommendedProduct.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("productId");

    if (!updated) {
      return res.status(404).json({ message: "Recommended product not found" });
    }

    res.status(200).json({ recommended: updated, message: "Recommended product updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete recommended product
const deleteRecommendedProduct = async (req, res) => {
  try {
    await RecommendedProduct.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recommended product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRecommendedProducts,
  getRecommendedProduct,
  createRecommendedProduct,
  updateRecommendedProduct,
  deleteRecommendedProduct,
};
