import User from "../../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/authUtils.js";

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email o contraseña inválidos" });
        }

        const token = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
            refres  
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
