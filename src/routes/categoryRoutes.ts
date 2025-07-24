import express, { Request, Response } from "express";
const router = express.Router();
import Product from "../models/product";

const slugify = (text: string): string => text.toLowerCase().replace(/-/g, " ");
router.get("/productsBycategory", async (req: any, res: any) => {
  try {
    let { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category parameter is required" });
    }

    category = slugify(category);
    // البحث في الحقلين العربي والإنجليزي
    const products = await Product.find({
      $or: [
        { "category.en": { $regex: new RegExp(category, "i") } },
        { "category.ar": { $regex: new RegExp(category, "i") } },
      ],
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
