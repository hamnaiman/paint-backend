// models/Collection.js
import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
