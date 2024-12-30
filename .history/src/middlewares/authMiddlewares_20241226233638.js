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
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "No tienes suficientes permisos" });
            }
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error del servidor" });
        }
    };
};
//act2