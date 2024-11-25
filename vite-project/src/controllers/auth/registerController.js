import User from "../../models/userModel.js";
import { generateToken } from "../../utils/authUtils.js";

const roles = ["admin", "user"]
export const registerController= async (req, res) => {
    const { email, password, role} = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: "Este usuario ya existe" });
        }
    
        if (!roles.includes(role)) {
          return res.status(400).json({ message: "Rol no existente" });
        }
    
        const user = await User.create({ email, password, role });
        const token = generateToken(user);
    
        res
          .status(201)
          .json({ id: user._id, email: user.email, role: user.role, token });
      } catch (error) {
        console.log({ error });
        res.status(500).json({ message: "Error del servidor" });
      }
    };