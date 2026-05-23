import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // GET AUTH HEADER
    const authHeader = req.headers.authorization;

    // CHECK AUTH HEADER
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    // EXTRACT TOKEN
    const token = authHeader.split(" ")[1];

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // SAVE USER ID
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default isAuth;
