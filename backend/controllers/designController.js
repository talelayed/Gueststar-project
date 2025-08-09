const Design = require("../models/designModel");

// Get all designs
const getAllDesigns = async (req, res) => {
  try {
    const { category } = req.params;
    const { subcategory } = req.params;

    if (!category || category=="undefined") {
      const allDesigns = await Design.find();

    if (allDesigns) {
      return res.status(200).json({ designs: allDesigns });
    } else {
      return res.status(500).json({ message: "no designs" });
    }
    }
    
    if(subcategory){
    const filteredDesigns = await Design.find({ category, subcategory });
    if(filteredDesigns)
    return res.status(200).json({ designs: filteredDesigns });
    else
    res.status(500).json({ message: "no designs" })
    }else{
    const filteredDesigns = await Design.find({ category });
    if(filteredDesigns)
    return res.status(200).json({ designs: filteredDesigns });
    else
    res.status(500).json({ message: "no designs" })
  }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get one design by id
const getOneDesign = async (req, res) => {
  try {
    const design = await Design.findOne({ _id: req.params.id });
    if (design) {
      res.status(200).json({ design: design });
    }else {
      res.status(500).json({ message: "design not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Add new design
const addNewDesign = async (req, res) => {
  const newDesign = new Design(req.body);
  try {
    await newDesign.save();
    res
      .status(200)
      .json({ design: newDesign, message: "design created successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
    
  }
};

// Update design by id
const updateDesign = async (req, res) => {
  try {
    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (updatedDesign) {
      res.status(200).json({
        design: updatedDesign,
        message: "design updated successfully",
      });
    } else {
      res.status(500).json({ message: "design not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Delete design by id
const deleteDesign = async (req, res) => {
  try {
    await Design.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Design deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  addNewDesign,
  getAllDesigns,
  getOneDesign,
  updateDesign,
  deleteDesign,
};
