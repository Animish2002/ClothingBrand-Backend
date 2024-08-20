const User = require("../models/user.js");

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden access" });
    }
    const users = await User.find();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllUsers };
