import express from "express";
import {
  addTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

router.post("/add", addTestimonial);
router.get("/all", getTestimonials);
router.put("/update/:id", updateTestimonial);
router.delete("/delete/:id", deleteTestimonial);

export default router;
