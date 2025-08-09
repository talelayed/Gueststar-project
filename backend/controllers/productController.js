const Product = require("../models/productModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const { subcategory } = req.params;

    if (!category || category=="undefined") {
      const allProducts = await Product.find();

    if (allProducts) {
      return res.status(200).json({ products: allProducts });
    } else {
      return res.status(500).json({ message: "no products" });
    }
    }
    
    if(subcategory){
    const filteredProducts = await Product.find({ category, subcategory });
    if(filteredProducts)
    return res.status(200).json({ products: filteredProducts });
    else
    res.status(500).json({ message: "no products" })
    }else{
    const filteredProducts = await Product.find({ category });
    if(filteredProducts)
    return res.status(200).json({ products: filteredProducts });
    else
    res.status(500).json({ message: "no products" })
  }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get one product by id
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.status(200).json({ product: product });
    }else {
      res.status(500).json({ message: "product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Add new product
const addNewProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res
      .status(200)
      .json({ product: newProduct, message: "product created successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update product by id
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (updatedProduct) {
      res.status(200).json({
        product: updatedProduct,
        message: "product updated successfully",
      });
    } else {
      res.status(500).json({ message: "product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete product by id
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  addNewProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
