const express = require("express");
const router = express.Router();
const {
    getAllCategories,
    getOneCategory,
    addNewCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAllCategories);
router.get("/:id", getOneCategory);
router.post("/", verifyToken, adminOnly, addNewCategory);
router.put("/:id", verifyToken, adminOnly, updateCategory);
router.delete("/:id", verifyToken, adminOnly, deleteCategory);

module.exports = router;
