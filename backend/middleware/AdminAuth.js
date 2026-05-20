import jwt from "jsonwebtoken";

const AdminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token1; // ✅ token1 use karo

    if (!token) {
      return res.status(401).json({ error: "Admin token not found" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken.email) {
      return res.status(403).json({ error: "Invalid admin token" });
    }

    req.adminEmail = verifyToken.email;

    next();
  } catch (error) {
    console.log("AdminAuth error");
    return res.status(401).json({ message: "Admin auth failed" });
  }
};

export default AdminAuth;
