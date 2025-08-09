const Client = require("../models/clientModel");
const bcrypt = require("bcryptjs");

// register client
const registerClient = async (req, res) => {
  const { username, email, password } = req.body;
  const clientExists = await Client.findOne({ email: email });

  if (clientExists) {
    res.status(500).json({ message: "client already exists" });
  } else {
    const newClient = new Client({ username, email, password });

    // Password bcrypt
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json(err);
        }
        // Store hash in your password DB.
        newClient.password = hash;
        try {
          const savedClient = await newClient.save();
          res.status(200).json(savedClient);
        } catch (err) {
          res.status(500).json(err);
        }
      });
    });
  }
};

module.exports = registerClient;
