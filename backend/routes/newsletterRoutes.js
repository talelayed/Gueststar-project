const express = require("express");
const router = express.Router();
const {
    subscribe,
    getAllSubscribers
} = require("../controllers/newsletterController");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");

router.post("/subscribe", subscribe);
router.get("/",  verifyToken, adminOnly, getAllSubscribers);

module.exports = router;
