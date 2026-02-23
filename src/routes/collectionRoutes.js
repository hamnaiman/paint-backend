import express from "express";
import {
  getAll,
  addItem,
  updateItem,
  deleteItem
} from "../controllers/collectionController.js";

const router = express.Router();

router.get("/all", getAll);
router.post("/add", addItem);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

export default router;
