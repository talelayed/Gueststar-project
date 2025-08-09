const express = require("express");
const router = express.Router();
const {
    getAllWorkers,
    getOneWorker,
    addNewWorker,
    updateWorker,
    deleteWorker,
} = require("../controllers/workerController");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");
const loginWorker = require("../controllers/loginWorker");

router.get("/", verifyToken, adminOnly, getAllWorkers);
router.get("/:id", verifyToken, adminOnly, getOneWorker);
router.post("/register", addNewWorker);
router.post("/login", loginWorker);
router.delete("/:id", verifyToken, adminOnly, deleteWorker);
router.put("/:id", verifyToken, adminOnly, updateWorker);

module.exports = router;
