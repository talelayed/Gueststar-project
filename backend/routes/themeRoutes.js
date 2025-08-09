const express = require("express");
const router = express.Router();
const {
    getAllThemes,
    getOneTheme,
    addNewTheme,
    updateTheme,
    deleteTheme
} = require("../controllers/themeController");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAllThemes);
router.get("/:id", getOneTheme);
router.post("/", verifyToken, adminOnly, addNewTheme);
router.put("/:id", verifyToken, adminOnly, updateTheme);
router.delete("/:id", verifyToken, adminOnly, deleteTheme);

module.exports = router;
