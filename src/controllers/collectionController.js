import Collection from "../models/Collection.js";

export const getAll = async (req, res) => {
  const data = await Collection.find().sort({ createdAt: 1 });
  res.json({ success: true, data });
};

export const addItem = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title & description required"
    });
  }

  const item = await Collection.create({ title, description });
  res.json({ success: true, item });
};

export const updateItem = async (req, res) => {
  const item = await Collection.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, item });
};

export const deleteItem = async (req, res) => {
  await Collection.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
