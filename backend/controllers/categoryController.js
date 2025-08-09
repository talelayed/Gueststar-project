const Category = require("../models/categoryModel");

// Get all Categories
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    if (allCategories) {
      res.status(200).json({ categories: allCategories });
    } else {
      res.status(500).json({ message: "no Categories found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get one category by id
const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (category) {
      res.status(200).json({ category: category });
    } else {
      res.status(500).json({ message: "category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Add new category
const addNewCategory = async (req, res) => {
  console.log("body",req.body);
  
  const newCategory = new Category(req.body);
  const categoryExists = await Category.findOne({ title: req.body.title });
  if (categoryExists)
    return res.status(500).json({ message: "Category already exists" });
  try {
    await newCategory.save();
    res.status(200).json({ category: newCategory });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update category by id
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (updatedCategory) {
      res.status(200).json({
        category: updatedCategory,
        message: "category updated successfully",
      });
    } else {
      res.status(500).json({ message: "category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete category by id
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  addNewCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
