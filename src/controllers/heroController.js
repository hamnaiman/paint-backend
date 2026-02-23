import Hero from "../models/Hero.js";
import cloudinary from "../config/cloudinary.js";

// Add Hero
export const addHero = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body, "REQ.FILE:", req.file);

    if (!req.body.title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const heroData = { ...req.body };

    if (req.file) {
      heroData.bgImage = req.file.path;
      heroData.bgImageId = req.file.filename;
    }

    const hero = await Hero.create(heroData);
    res.json({ success: true, hero });
  } catch (err) {
    console.error("Add Hero Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Hero
export const getAllHero = async (req, res) => {
  try {
    const hero = await Hero.find().sort({ createdAt: -1 });
    res.json({ success: true, hero });
  } catch (err) {
    console.error("Get All Hero Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Hero
export const updateHero = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length !== 24) return res.status(400).json({ success: false, message: "Invalid Hero ID" });

    const hero = await Hero.findById(id);
    if (!hero) return res.status(404).json({ success: false, message: "Hero not found" });

    const updateData = {};
    const fields = ["title", "subtitle", "description", "primaryBtnText", "primaryBtnLink", "secondaryBtnText", "secondaryBtnLink"];
    fields.forEach(field => { if (req.body[field] !== undefined) updateData[field] = req.body[field]; });

    if (req.file) {
      if (hero.bgImageId) await cloudinary.uploader.destroy(hero.bgImageId);
      updateData.bgImage = req.file.path;
      updateData.bgImageId = req.file.filename;
    }

    const updatedHero = await Hero.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    res.json({ success: true, hero: updatedHero });
  } catch (err) {
    console.error("Update Hero Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Hero
export const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ success: false, message: "Hero not found" });

    if (hero.bgImageId) await cloudinary.uploader.destroy(hero.bgImageId);
    await Hero.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Hero deleted successfully" });
  } catch (err) {
    console.error("Delete Hero Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};