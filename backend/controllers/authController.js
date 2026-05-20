import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

import { gentoken, gentoken1 } from "../config/token.js";
import { cookieOptions } from "../config/cookieOptions.js";

// ================= REGISTER =================

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Check user already exists
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter valid email",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be minimum 8 characters",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // Generate token
    const token = gentoken(user._id);

    // Save cookie
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

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

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid password",
      });
    }

    // Generate token
    const token = gentoken(user._id);

    // Save cookie
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Login error",
    });
  }
};

// ================= LOGOUT =================

export const logout = async (req, res) => {
  try {
    // Clear User Cookie
    res.clearCookie("token", cookieOptions);

    // Clear Admin Cookie
    res.clearCookie("token1", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);

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

    // Create user if not exists
    if (!user) {
      const hashPassword = await bcrypt.hash("google_auth_user", 10);

      user = await User.create({
        name,
        email,
        password: hashPassword,
      });
    }

    // Generate token
    const token = gentoken(user._id);

    // Save cookie
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

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
      // Generate admin token
      const token = gentoken1(email);

      // Save admin cookie
      res.cookie("token1", token, cookieOptions);

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
      });
    }

    return res.status(400).json({
      success: false,
      error: "Invalid credentials",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Admin login error",
    });
  }
};
