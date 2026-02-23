import About from "../models/About.js";
import cloudinary from "../config/cloudinary.js";

// ---------------- ADD ----------------
export const addAbout = async (req, res) => {
  try {
    const about = new About({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      image: req.file ? req.file.path : null, // ✅ Cloudinary URL
    });

    await about.save();
    res.json({ success: true, about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- GET ALL ----------------
export const getAbout = async (req, res) => {
  try {
    const data = await About.find();

    // ✅ Direct Cloudinary URL send karo (no /uploads)
    res.json({
      success: true,
      about: data,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- DELETE ----------------
export const deleteAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // 🔥 Delete image from Cloudinary
    if (about.image) {
      const publicId = about.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`admin_uploads/${publicId}`);
    }

    await About.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- UPDATE ----------------
export const updateAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      // 🔥 Delete old image
      if (about.image) {
        const publicId = about.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`admin_uploads/${publicId}`);
      }

      data.image = req.file.path; // ✅ Save new Cloudinary URL
    }

    const updated = await About.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};