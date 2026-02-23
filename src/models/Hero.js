import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    bgImage: { type: String, required: true },

    primaryBtnText: String,
    primaryBtnLink: String,

    secondaryBtnText: String,
    secondaryBtnLink: String,
  },
  { timestamps: true }
);

export default mongoose.model("Hero", heroSchema);
