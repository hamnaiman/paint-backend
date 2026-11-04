import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hex: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["color", "texture"],
    default: "color",
  },
  image: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Gallery", gallerySchema);
