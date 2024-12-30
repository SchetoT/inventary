import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Verificar si el usuario existe
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
//ac