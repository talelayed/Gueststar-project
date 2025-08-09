const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Worker = require("../models/workerModel"); // Adjust path if needed

const loginWorker = async (req, res) => {
  const { email, password } = req.body;
  const workerExists = await Worker.findOne({ email: email })
  
  if (!workerExists) {
    return res.status(404).json({ message: "No worker with this email" });
  }

  bcrypt.compare(password, workerExists.password, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (!result) {
      return res.status(401).json({ message: "Wrong credentials" });
    } else {
      const payload = {
        id: workerExists._id,
        email: workerExists.email,
        isAdmin: workerExists.isAdmin, // Case-sensitive: match your schema field
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Token generation failed" });
        }

        res.status(200).json({
          message: "Worker logged in",
          worker: workerExists,
          token: "Bearer " + token,
        });
      });
    }
  });
};


module.exports = loginWorker;
