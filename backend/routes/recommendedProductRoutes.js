const express = require("express");
const router = express.Router();
const {
  getAllRecommendedProducts,
  getRecommendedProduct,
  createRecommendedProduct,
  updateRecommendedProduct,
  deleteRecommendedProduct,
} = require("../controllers/recommendedProductController");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAllRecommendedProducts);
router.get("/:id", getRecommendedProduct);
router.post("/", verifyToken, adminOnly, createRecommendedProduct);
router.put("/", verifyToken, adminOnly, updateRecommendedProduct);
router.delete("/:id", verifyToken, adminOnly, deleteRecommendedProduct);

module.exports = router;
