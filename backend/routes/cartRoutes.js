import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import isAuth from "../middleware/isAuth.js";

const cartRoutes = express.Router();

cartRoutes.post("/addtocart", isAuth, addToCart);
cartRoutes.post("/getusercart", isAuth, getUserCart);
cartRoutes.post("/updatecart", isAuth, updateCart);

export default cartRoutes;
