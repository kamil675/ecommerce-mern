import jwt from "jsonwebtoken";

// USER TOKEN
export const gentoken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log("User token error", error);
  }
};

// ADMIN TOKEN
export const gentoken1 = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log("Admin token error", error);
  }
};
