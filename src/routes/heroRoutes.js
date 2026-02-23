import express from "express";
import { addHero, getAllHero, updateHero, deleteHero } from "../controllers/heroController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("bgImage"), addHero);
router.get("/all", getAllHero);
router.put("/update/:id", upload.single("bgImage"), updateHero);
router.delete("/delete/:id", deleteHero);

export default router;