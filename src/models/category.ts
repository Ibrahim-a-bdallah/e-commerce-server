import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  url: { type: String, required: true },
});

export default mongoose.model("Category", categorySchema);
