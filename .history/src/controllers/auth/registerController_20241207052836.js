import User from "../../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/authUtils.js";

const roles = ["admin", "user"];

export const registerController = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Este usuario ya existe" });
        }

        if (!roles.includes(role)) {
            return res.status(400).json({ message: "Rol no existente" });
        }
        const user = await User.create({ email, password, role });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(201).json({ 
            id: user._id, 
            name: 
            email: user.email, 
            role: user.role, 
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};
