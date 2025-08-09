const express = require("express");
const router = express.Router();
const {
    addReview,
    getProductReviews,
    deleteReview,
    updateReview
} = require("../controllers/reviewController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/:productId", getProductReviews);
router.post("/", verifyToken, addReview);
router.delete("/:id", verifyToken, deleteReview);
router.put("/", verifyToken, updateReview)

module.exports = router;
