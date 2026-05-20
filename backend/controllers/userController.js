import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const getAdminUser = async (req, res) => {
  try {
    let adminEmail = req.adminEmail;

    if (!adminEmail) {
      return res.status(404).json({ error: "Admin not found" });
    }

    return res.status(200).json({
      email: adminEmail,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
