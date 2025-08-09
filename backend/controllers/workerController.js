const Worker = require("../models/workerModel");
const registerWorker = require("./registerWorkerController");

// Get all workers
const getAllWorkers = async (req, res) => {
  try {
    const allWorkers = await Worker.find();
    if (allWorkers) {
      res.status(200).json({ workers: allWorkers });
    } else {
      res.status(500).json({ message: "no workers found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get one worker by id
const getOneWorker = async (req, res) => {
  try {
    const worker = await Worker.findOne({ _id: req.params.id });
    if (worker) {
      res.status(200).json({ worker: worker });
    } else {
      res.status(500).json({ message: "worker not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Add new worker
const addNewWorker = async (req, res) => {
  registerWorker(req, res);
};

// Update worker by id
const updateWorker = async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(req.params.id, req.body);
    if (updatedWorker) {
      res
        .status(200)
        .json({ worker: updatedWorker, message: "worker updated successfully" });
    } else {
      res.status(500).json({ message: "worker not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete worker by id
const deleteWorker = async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "worker deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllWorkers,
  getOneWorker,
  addNewWorker,
  updateWorker,
  deleteWorker,
};
