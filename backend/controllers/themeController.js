const Theme = require("../models/themeModel");

// Get all Themes
const getAllThemes = async (req, res) => {
  try {
    const allThemes = await Theme.find();
    if (allThemes) {
      res.status(200).json({ themes: allThemes });
    } else {
      res.status(500).json({ message: "no Themes found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get one theme by id
const getOneTheme = async (req, res) => {
  try {
    const theme = await Theme.findOne({ _id: req.params.id });
    if (theme) {
      res.status(200).json({ theme: theme });
    } else {
      res.status(500).json({ message: "theme not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Add new theme
const addNewTheme = async (req, res) => {
  console.log("body",req.body);
  
  const newTheme = new Theme(req.body);
  const themeExists = await Theme.findOne({ title: req.body.title });
  if (themeExists)
    return res.status(500).json({ message: "Theme already exists" });
  try {
    await newTheme.save();
    res.status(200).json({ theme: newTheme });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update theme by id
const updateTheme = async (req, res) => {
  try {
    const updatedTheme = await Theme.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (updatedTheme) {
      res.status(200).json({
        theme: updatedTheme,
        message: "theme updated successfully",
      });
    } else {
      res.status(500).json({ message: "theme not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete theme by id
const deleteTheme = async (req, res) => {
  try {
    await Theme.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Theme deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  addNewTheme,
  getAllThemes,
  getOneTheme,
  updateTheme,
  deleteTheme,
};
