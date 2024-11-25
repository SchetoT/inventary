import User from "../../models/userModel.js";

export const createUser = async (req, res) => {
    const {name, email} = req.body;

    if (!name || !email){
        return res.status(400).json({message: "Todos los campos son requeridos"})
    }

    const newUser = await User.create(req.body);

    res.status(201).json(newUser, {message: "usuario creado"})
}