const express = require("express");
const router = express.Router();
const {
    getAllClients,
    getOneClient,
    addNewClient,
    updateClient,
    deleteClient
} = require("../controllers/clientController");
const adminOnly = require("../middlewares/adminOnly");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getAllClients);
router.get("/:id", verifyToken, getOneClient);
router.post("/register", addNewClient);
router.put("/:id", verifyToken , updateClient);
router.delete("/:id", verifyToken, adminOnly, deleteClient);

module.exports = router;
