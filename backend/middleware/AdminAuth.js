import jwt from "jsonwebtoken";

const AdminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token1;

    console.log("ADMIN TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminEmail = decoded.email;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Admin auth failed",
    });
  }
};

export default AdminAuth;
