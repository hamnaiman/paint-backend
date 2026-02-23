import Gallery from "../models/Gallery.js";

// Add Color
export const addColor = async (req, res) => {
  try {
    const { name, hex } = req.body;

    const color = await Gallery.create({ name, hex });

    res.json({ success: true, message: "Color added", color });
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
    const { name, hex } = req.body;

    const color = await Gallery.findByIdAndUpdate(
      id,
      { name, hex },
      { new: true }
    );

    res.json({ success: true, message: "Color updated", color });
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
