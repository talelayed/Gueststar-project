const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getOneProduct,
    addNewProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.post("/", verifyToken, adminOnly, validateProduct, addNewProduct);
router.put("/:id", verifyToken, adminOnly, validateProduct, updateProduct);
router.delete("/:id", verifyToken, adminOnly, deleteProduct);

module.exports = router;
