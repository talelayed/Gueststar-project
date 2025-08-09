const Newsletter = require("../models/newsletterModel");


const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Check if email is already subscribed
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "You are already subscribed." });
    }

    const newSubscription = new Newsletter({ email });
    await newSubscription.save();

    return res.status(201).json({ message: "Subscribed successfully." });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    return res.status(200).json(subscribers);
  } catch (error) {
    console.error("Get subscribers error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
    subscribe,
    getAllSubscribers
};