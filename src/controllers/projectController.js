import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// ---------------- ADD PROJECT ----------------
export const addProject = async (req, res) => {
  try {
    const images = req.files
      ? req.files.map(file => file.path) // ✅ Cloudinary URLs
      : [];

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      images,
    });

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- GET ALL ----------------
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- UPDATE ----------------
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const data = {
      title: req.body.title,
      description: req.body.description,
    };

    // If new images uploaded
    if (req.files && req.files.length > 0) {

      // 🔥 Delete old images from Cloudinary
      if (project.images && project.images.length > 0) {
        for (const imageUrl of project.images) {
          const publicId = imageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`admin_uploads/${publicId}`);
        }
      }

      data.images = req.files.map(file => file.path); // ✅ Save new URLs
    }

    await Project.findByIdAndUpdate(req.params.id, data, { new: true });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- DELETE ----------------
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // 🔥 Delete all images from Cloudinary
    if (project.images && project.images.length > 0) {
      for (const imageUrl of project.images) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`admin_uploads/${publicId}`);
      }
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};