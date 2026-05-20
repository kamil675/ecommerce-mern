import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

connectDb();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",

      "https://ecommerce-mern-chi-seven.vercel.app",
      "https://ecommerce-mern-13ri.vercel.app",
    ],

    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
