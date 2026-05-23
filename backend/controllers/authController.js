import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

import { gentoken, gentoken1 } from "../config/token.js";

// ================= REGISTER =================

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be minimum 8 characters",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // TOKEN GENERATE
    const token = gentoken(user._id);

    console.log("REGISTER TOKEN:", token);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("REGISTRATION ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Registration error",
    });
  }
};

// ================= LOGIN =================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid password",
      });
    }

    // TOKEN GENERATE
    const token = gentoken(user._id);

    console.log("LOGIN TOKEN:", token);
    console.log("LOGIN RESPONSE SENDING");
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Login error",
    });
  }
};

// ================= LOGOUT =================

export const logout = async (req, res) => {
  try {
    console.log("LOGIN RESPONSE SENDING");
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Logout error",
    });
  }
};

// ================= GOOGLE LOGIN =================

export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const hashPassword = await bcrypt.hash("google_auth_user", 10);

      user = await User.create({
        name,
        email,
        password: hashPassword,
      });
    }

    // TOKEN GENERATE
    const token = gentoken(user._id);

    console.log("GOOGLE TOKEN:", token);
    console.log("LOGIN RESPONSE SENDING");
    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("GOOGLE LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Google login error",
    });
  }
};

// ================= ADMIN LOGIN =================

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = gentoken1(email);
      console.log("LOGIN RESPONSE SENDING");
      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token: token,
      });
    }

    return res.status(400).json({
      success: false,
      error: "Invalid credentials",
    });
  } catch (error) {
    console.log("ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Admin login error",
    });
  }
};
