const express = require("express");
const router = express.Router();
const {
    getAllOrders,
    getOneOrder,
    AddNewOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, adminOnly, getAllOrders);
router.get("/:id", verifyToken, adminOnly, getOneOrder);
router.post("/", AddNewOrder);
router.put("/:id", verifyToken, adminOnly, updateOrder);
router.delete("/:id", verifyToken, adminOnly, deleteOrder);

module.exports = router;
