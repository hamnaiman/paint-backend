import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }], // 👈 3 images
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
