import dotenv from "dotenv";
import express from "express";
import connectDB from "./utils/db";
import cors from "cors";
import authController from "./controllers/sign.Controller";
import categoriesRoutes from "./routes/categoriesRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";
import { Router } from "express";

const router = Router();
dotenv.config();

const app = express();

// الاتصال بـ MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use("/", router);

// تعيين المسارات
app.use("/categories", categoriesRoutes);
app.use("/products", categoryRoutes);
app.use("/products", productRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/users", authController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
