const Client = require("../models/clientModel");
const registerClient = require("./registerClientController");

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const allClients = await Client.find();
    if (allClients) {
      res.status(200).json({ clients: allClients });
    } else {
      res.status(500).json({ message: "no clients" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get one client by id
const getOneClient = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id });
    if (client) {
      res.status(200).json({ client: client });
    } else {
      res.status(500).json({ message: "client not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Add new client
const addNewClient = async (req, res) => {
  registerClient(req, res);
};

// Update client by id
const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body);
    if (updatedClient) {
      res
        .status(200)
        .json({ client: updatedClient, message: "client updated successfully" });
    } else {
      res.status(500).json({ message: "client not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete client by id
const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllClients,
  getOneClient,
  addNewClient,
  updateClient,
  deleteClient,
};
