const express = require("express");
const router = express.Router();
const {
    getAllDesigns,
    getOneDesign,
    addNewDesign,
    updateDesign,
    deleteDesign
} = require("../controllers/designController");
const validateProduct = require("../middlewares/validateProduct");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAllDesigns);
router.get("/:id", getOneDesign);
router.post("/", verifyToken, adminOnly, addNewDesign);
router.put("/:id", verifyToken, adminOnly, validateProduct, updateDesign);
router.delete("/:id", verifyToken, adminOnly, deleteDesign);

module.exports = router;
