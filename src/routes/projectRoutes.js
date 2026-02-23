import express from "express";
import upload from "../middleware/upload.js";
import {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/add", upload.array("images", 3), addProject);
router.put("/update/:id", upload.array("images", 3), updateProject);

router.get("/all", getProjects);
router.put("/update/:id", upload.single("image"), updateProject);
router.delete("/delete/:id", deleteProject);

export default router;
