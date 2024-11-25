import User from "../../models/userModel.js";
import { generateToken } from "../../utils/authUtils.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    let isMatch = false;
    if (user) {
      isMatch = await user.matchPassword(password);
    }

    if (isMatch) {
      const token = await generateToken(user);
      res.status(200).json({ name: user.name, email: user.email, token });
    } else {
      return res.status(401).json({ message: "email or password invalid." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};