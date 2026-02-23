import express from "express";
import {
  addColor,
  getColors,
  updateColor,
  deleteColor,
} from "../controllers/galleryController.js";

import GalleryColor from "../models/Gallery.js";

const router = express.Router();

// Add Color
router.post("/", addColor);

// Get All Colors
router.get("/", async (req, res) => {
  try {
    const colors = await GalleryColor.find();

    res.json({
      success: true,
      colors,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// Update Color
router.put("/:id", updateColor);

// Delete Color
router.delete("/:id", deleteColor);

export default router;
