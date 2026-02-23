import express from "express";
import upload from "../middleware/upload.js";
import {
  addAbout,
  getAbout,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController.js";

const router = express.Router();

// ADD ABOUT (with image)
router.post(
  "/add",
  upload.single("image"), // 🔥 image field name MUST be "image"
  addAbout
);

// GET ALL ABOUT
router.get("/all", getAbout);

// UPDATE ABOUT (with optional image)
router.put(
  "/update/:id",
  upload.single("image"), // 🔥 VERY IMPORTANT
  updateAbout
);

// DELETE ABOUT
router.delete("/delete/:id", deleteAbout);

export default router;
