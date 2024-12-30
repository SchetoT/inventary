import User from "../../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/authUtils.js";
import logger from "../../utils/logger.js";
const roles = ["admin", "user"];

export const registerController = async (req, res) => {
const { nameUser, email, password, role } = req.body;

try {

    const userExists = await User.findOne({ email });
    if (userExists) {
    logger.warn(`El correo ingresado y está registrado: ${email}`);
    return res.status(400).json({ message: "Este usuario ya existe" });
    }

    if (!roles.includes(role)) {
    logger.warn(`Rol no válido: ${role}`);
    return res.status(400).json({ message: "Rol no existente" });
    }

    const user = await User.create({ nameUser, email, password, role });
    logger.info(`EL usuario se registró exitosamente: ID=${user._id}, Email=${user.email}`);


    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);


    res.status(201).json({ 
    id: user._id, 
    name: user.nameUser,
    email: user.email, 
    role: user.role, 
    accessToken,
    refreshToken
    });
} catch (error) {
    logger.error("Error al registrar el usuario:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Error del servidor", error: error.message });
}
};
