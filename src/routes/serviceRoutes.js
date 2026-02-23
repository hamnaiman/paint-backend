import express from "express";
import {
  addService,
  getServices,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

const router = express.Router();

router.post("/add", addService);
router.get("/all", getServices);
router.put("/update/:id", updateService);
router.delete("/delete/:id", deleteService);

export default router;
