const Client = require("../models/clientModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login client
const loginClient = async (req, res) => {
  const { email, password } = req.body;
  const clientExists = await Client.findOne({ email: email });
  if (!clientExists) {
    return res.status(500).json({ message: "No client with this email" });
  }
  bcrypt.compare(password, clientExists.password, function (err, resultat) {
    if (err) {
      return res.status(500).json(err);
    }
    if (!resultat) {
      return res.status(500).json({ message: "wrong credentials" });
    } else {
      const payload = {
        id: clientExists._id,
        email: clientExists.email,
      };

      jwt.sign(payload, "secret", { expiresIn: "3d" }, (err, token) => {
        if (err) {
          return res.status(500).json(err);
        }

        clientExists.token = "Bearer " + token;
        res.status(200).json({
          message: "client logged in",
          client: clientExists,
          token: "Bearer " + token,
        });
      });
    }
  });
};

module.exports = loginClient;
