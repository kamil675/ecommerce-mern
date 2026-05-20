import jwt from "jsonwebtoken";

// USER TOKEN
export const gentoken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ADMIN TOKEN
export const gentoken1 = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
