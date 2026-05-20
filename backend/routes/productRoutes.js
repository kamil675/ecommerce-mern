import express from "express";
import upload from "../middleware/multer.js";
import {
  AddProduct,
  listProduct,
  removeProduct,
} from "../controllers/ProductController.js";
import AdminAuth from "../middleware/AdminAuth.js";
const productRoutes = express.Router();

productRoutes.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  AddProduct,
);
productRoutes.get("/list", listProduct);
productRoutes.post("/remove/:id", AdminAuth, removeProduct);

export default productRoutes;
