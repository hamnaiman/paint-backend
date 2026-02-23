import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hex: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Gallery", gallerySchema);
