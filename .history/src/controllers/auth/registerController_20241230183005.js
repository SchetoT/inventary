import User from "../../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/authUtils.js";
import logger from "../../utils/logger.js"; // Importa el logger configurado

const roles = ["admin", "user"];

export const registerController = async (req, res) => {
  const { nameUser, email, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn(`Intento de registro con email existente: ${email}`);
      return res.status(400).json({ message: "Este usuario ya existe" });
    }

    // Validar el rol proporcionado
    if (!roles.includes(role)) {
      logger.warn(`Rol no válido proporcionado durante el registro: ${role}`);
      return res.status(400).json({ message: "Rol no existente" });
    }

    // Crear el usuario
    const user = await User.create({ nameUser, email, password, role });
    logger.info(`Usuario registrado exitosamente: ID=${user._id}, Email=${user.email}`);

    // Generar tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Responder con los datos del usuario y los tokens
    res.status(201).json({ 
      id: user._id, 
      name: user.nameUser,
      email: user.email, 
      role: user.role, 
    accessToken,
      refreshToken
    });
} catch (error) {
    // Registrar el error con Winston
    logger.error("Error al registrar el usuario:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Error del servidor", error: error.message });
}
};
