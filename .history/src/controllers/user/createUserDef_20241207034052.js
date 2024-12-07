import User from "../../models/userModel.js";

export const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.status(400).json({message: "Todos los campos son requeridos"})
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "Este correo ya está registrado..."})
        }
        const newUser = new User({
            name,
            email,
            password
        })
        await newUser.save();
        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        });
    } catch (error) {
        console.error("error al crear el usuario:", error);
        res.status(500).json({ message: "error en el servidor", error: error.mesagge});
    }
};