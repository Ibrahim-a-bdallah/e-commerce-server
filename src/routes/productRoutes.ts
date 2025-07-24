import express from "express";
const router = express.Router();
import Product from "../models/product";

router.get("/", async (req: any, res: any) => {
  try {
    const { title } = req.query;
    const { _id } = req.query;
    let products;

    if (_id) {
      if (_id.length > 1) {
        products = await Product.find({
          _id: { $in: _id },
        });
      } else {
        products = await Product.findById(_id);
      }
    }

    if (title) {
      const regex = new RegExp(title, "i");
      products = await Product.find({ title: { $regex: regex } });
    } else if (_id) {
      if (_id.length > 1) {
        products = await Product.find({
          _id: { $in: _id },
        });
      } else {
        products = await Product.findById(_id);
      }
    } else {
      products = await Product.find();
    }

    if (!products) {
      return res.status(404).json({ msg: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
