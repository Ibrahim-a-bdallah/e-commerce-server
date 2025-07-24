import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  date: Date,
  reviewerName: String,
  reviewerEmail: String,
});

const metaSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  barcode: String,
  qrCode: String,
});

const productSchema = new mongoose.Schema({
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  description: {
    ar: { type: String },
    en: { type: String },
  },
  category: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  price: {
    eg: { type: Number, required: true },
    ae: Number,
    sa: Number,
  },
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  availabilityStatus: String,
  reviews: [reviewSchema],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: metaSchema,
  images: [String],
  thumbnail: String,
});

export default mongoose.model("Product", productSchema);
