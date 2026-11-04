import Gallery from "../models/Gallery.js";

// Add Color
export const addColor = async (req, res) => {
  try {
    const { name, hex, type = "color" } = req.body;
    if (!name?.trim()) return res.status(400).json({ success: false, message: "Name is required" });
    if (!['color', 'texture'].includes(type)) return res.status(400).json({ success: false, message: "Invalid gallery type" });
    if (type === 'texture' && !req.file?.path) return res.status(400).json({ success: false, message: "Upload a texture image" });
    if (type === 'color' && !/^#[0-9a-f]{6}$/i.test(hex || '')) return res.status(400).json({ success: false, message: "Enter a valid hex color" });
    const item = await Gallery.create({ name: name.trim(), hex: type === 'color' ? hex : '', type, image: req.file?.path || '' });
    res.json({ success: true, message: "Gallery item added", color: item });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Colors
export const getColors = async (req, res) => {
  try {
    const colors = await Gallery.find();
    res.json({ success: true, colors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update Color
export const updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findById(id);
    if (!item) return res.status(404).json({ success: false, message: "Gallery item not found" });
    const { name, hex, type = item.type } = req.body;
    if (!name?.trim()) return res.status(400).json({ success: false, message: "Name is required" });
    if (!['color', 'texture'].includes(type)) return res.status(400).json({ success: false, message: "Invalid gallery type" });
    const image = req.file?.path || item.image;
    if (type === 'texture' && !image) return res.status(400).json({ success: false, message: "Upload a texture image" });
    if (type === 'color' && !/^#[0-9a-f]{6}$/i.test(hex || '')) return res.status(400).json({ success: false, message: "Enter a valid hex color" });
    item.name = name.trim(); item.type = type; item.hex = type === 'color' ? hex : ''; item.image = type === 'texture' ? image : '';
    await item.save();
    res.json({ success: true, message: "Gallery item updated", color: item });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete Color
export const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;

    await Gallery.findByIdAndDelete(id);

    res.json({ success: true, message: "Color deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
