import User from "../../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/authUtils.js";
import { body, validationResult } from "express-validator"; // Importar validaciones
import logger from "../../utils/logger.js"; // Importar el logger

const roles = ["admin", "user"];

export const registerController = [

body('email').isEmail().withMessage('Debe ser un correo válido'),
body('nameUser').notEmpty().withMessage('El nombre de usuario es obligatorio'),
body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
body('role').isIn(roles).withMessage('Rol no existente'),


async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
    }

    const { nameUser, email, password, role } = req.body;

    try {
    logger.info(`Registro de usuario: ${email}`); 

    const userExists = await User.findOne({ email });
    if (userExists) {
        logger.warn(`El usuario con email ${email} ya existe`); 
        return res.status(400).json({ message: "Este usuario ya existe" });
    }

    const user = await User.create({ nameUser, email, password, role });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

      logger.info(`Usuario registrado exitosamente: ${email}`);

    res.status(201).json({
        id: user._id,
        name: user.nameUser,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken
    });

    } catch (error) {
      logger.error(`Error al registrar el usuario: ${error.message}`); // Log de error
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
    }
}
];
