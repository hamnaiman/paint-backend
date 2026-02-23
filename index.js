import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import adminAuthRoutes from "./src/routes/adminAuthRoutes.js";

import serviceRoutes from "./src/routes/serviceRoutes.js";
import galleryRoutes from "./src/routes/galleryRoutes.js";
import testimonialRoutes from "./src/routes/testimonialRoutes.js";
import heroRoutes from "./src/routes/heroRoutes.js";
import aboutRoutes from "./src/routes/aboutRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import collectionRoutes from "./src/routes/collectionRoutes.js";


// ---------------- APP INIT ----------------
const app = express();

// ---------------- BASIC MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- DB CONNECTION ----------------
connectDB();


// ---------------- ROUTES ----------------
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

app.use("/api/admin", adminAuthRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/hero", heroRoutes);

// ---------------- GLOBAL ERROR HANDLER (IMPORTANT) ----------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});