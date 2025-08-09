const Worker = require("../models/workerModel");
const bcrypt = require("bcryptjs");

// Fonction de création d’un nouveau worker
const registerWorker = async (req, res) => {
  try {
    const {
      surname,
      name,
      number,
      email,
      password,
      isAdmin = false,
      img,
      address,
      country,
      city,
      postalCode,
      instagram,
      tiktok,
    } = req.body;

    // Vérification des champs obligatoires
    if (!surname || !name || !number || !email || !password) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs obligatoires.",
      });
    }
    console.log("img:", img);
    

    // Vérification si un utilisateur avec cet email existe déjà
    const workerExists = await Worker.findOne({ email });
    if (workerExists) {
      return res.status(400).json({
        message: "Un compte avec cet email existe déjà.",
      });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création de l'utilisateur avec image par défaut si aucune image fournie
    const newWorker = new Worker({
      surname,
      name,
      number,
      email,
      password: hashedPassword,
      isAdmin,
      address,
      country,
      city,
      postalCode,
      instagram,
      tiktok,
      img: img?.url || "https://i.ibb.co/MBtjqXQ/no-avatar.gif",
    });

    // Sauvegarde dans la base de données
    const savedWorker = await newWorker.save();

    // Réponse succès
    res.status(201).json(savedWorker);
  } catch (err) {
    console.error("Erreur lors de l’enregistrement du worker:", err);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du compte.",
    });
  }
};

module.exports = registerWorker;
