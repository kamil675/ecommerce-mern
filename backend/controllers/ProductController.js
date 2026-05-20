import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/ProductModel.js";

export const AddProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);
    const image4 = await uploadOnCloudinary(req.files.image4[0].path);

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    });

    return res.status(200).json({ product });
  } catch (error) {
    console.log("Add Product Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const listProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json({ product });
  } catch (error) {
    console.log("Get All Products Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json({ product });
  } catch (error) {
    console.log("Delete Product Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
