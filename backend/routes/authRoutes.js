import express from "express";
import {
  registration,
  login,
  logout,
  googleLogin,
  adminLogin,
} from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration", registration);

authRoutes.post("/login", login);

authRoutes.get("/logout", logout);

authRoutes.post("/googlelogin", googleLogin);

authRoutes.post("/adminlogin", adminLogin);

export default authRoutes;
