import User from "../../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/authUtils.js";
import logger from "../../utils/logger.js"; // Importar logger

export const loginController = async (req, res) => {
const { email, password } = req.body;

try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
    logger.warn(`Correo no registrado al iniciar sesion: ${email}`);
    return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
    logger.warn(`Intento de inicio de sesión fallido (contraseña incorrecta): Email=${email}`);
    return res.status(401).json({ message: "Email o contraseña inválidos" });
    }

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    logger.info(`Inicio de sesión exitoso: ID=${user._id}, Email=${user.email}`);
    res.status(200).json({
    id: user._id,
    name: user.nameUser,
    email: user.email,
    role: user.role,
    token,
    refreshToken
    });
} catch (error) {
    logger.error("Error en login:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Server Error", error: error.message });
}
};
