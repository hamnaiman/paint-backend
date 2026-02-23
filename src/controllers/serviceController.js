import Service from "../models/Service.js";

// ADD
export const addService = async (req, res) => {
  const service = await Service.create(req.body);
  res.json({ success: true, service });
};

// ALL
export const getServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json({ success: true, services });
};

// UPDATE
export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, service });
};

// DELETE
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
