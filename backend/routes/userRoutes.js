import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser, getAdminUser } from "../controllers/userController.js";
import AdminAuth from "../middleware/AdminAuth.js";

let userRoutes = express.Router();

userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);

userRoutes.get("/getadmin", AdminAuth, getAdminUser);

export default userRoutes;
