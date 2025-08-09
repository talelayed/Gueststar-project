const Order = require("../models/orderModel");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate("clientId");
    if (allOrders) {
      res.status(200).json({ orders: allOrders });
    } else {
      res.status(404).json({ message: "No orders found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get order by id
const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("clientId");
    if (order) {
      res.status(200).json({ order: order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Add new order
const AddNewOrder = async (req, res) => {
  const { name, company, address, country, city, postalCode, number, total, products } = req.body;

  if (!name || !company || !address || !country || !city || !number || !total || !products) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newOrder = new Order({
    name,
    company,
    address,
    country,
    city,
    postalCode,
    number,
    total,
    products,
  });

  try {
    await newOrder.save();
    res.status(201).json({ order: newOrder, message: "Order created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order by id
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedOrder) {
      res.status(200).json({ order: updatedOrder, message: "Order updated successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete order by id
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllOrders,
  getOneOrder,
  AddNewOrder,
  updateOrder,
  deleteOrder,
};
