import Testimonial from "../models/Testimonial.js";

// ADD
export const addTestimonial = async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    const newTestimonial = new Testimonial({ name, message, rating });
    await newTestimonial.save();

    res.json({ success: true, message: "Testimonial added" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message, rating } = req.body;

    await Testimonial.findByIdAndUpdate(id, { name, message, rating });

    res.json({ success: true, message: "Testimonial updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);

    res.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
