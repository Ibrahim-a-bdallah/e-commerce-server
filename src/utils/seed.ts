import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "../../db.json";
import User from "../models/user";
import Category from "../models/category";
import Product from "../models/product";
import Wishlist from "../models/wishlist";

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Wishlist.deleteMany({}),
    ]);

    if (data.users?.length) await User.insertMany(data.users);
    if (data.categories?.length) await Category.insertMany(data.categories);
    if (data.products?.length) await Product.insertMany(data.products);
    if (data.wishlist?.length) await Wishlist.insertMany(data.wishlist);

    console.log("✅ Data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
