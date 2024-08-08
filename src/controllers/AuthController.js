const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, address, pinCode, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const userModel = new User({ name, email, address, pinCode, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    return res.status(201).json({ message: "Signup success", success: true });
  } catch (err) {
    console.error(err); // Log the error to identify the issue
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Email or password is incorrect", success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "Email or password is incorrect", success: false });
    }
    const jwtToken = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
   
  } catch (err) {
    console.error(err); // Log the error to identify the issue
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
