import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // DEBUG

    // Get token from cookies
    const token = req.cookies.token;

    // If token not found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save userId in request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default isAuth;
