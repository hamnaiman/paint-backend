import express from "express";
import {
  addColor,
  getColors,
  updateColor,
  deleteColor,
} from "../controllers/galleryController.js";

import GalleryColor from "../models/Gallery.js";
import upload from "../middleware/upload.js";
import auth from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Add Color
router.post("/", auth, upload.single("image"), addColor);

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

router.get("/:id", async (req, res) => {
  try {
    const color = await GalleryColor.findById(req.params.id);
    if (!color) return res.status(404).json({ success: false, message: "Gallery item not found" });
    res.json({ success: true, color });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update Color
router.put("/:id", auth, upload.single("image"), updateColor);

// Delete Color
router.delete("/:id", auth, deleteColor);

export default router;
