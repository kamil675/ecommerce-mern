const isAuth = async (req, res, next) => {
  console.log("FULL COOKIES:", req.cookies);

  const token = req.cookies.token;

  console.log("USER TOKEN:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User not logged in",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decoded.userId;

  next();
};

export default isAuth;
