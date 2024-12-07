import User from "../../models/userModel.js"

export const getAllUsersDef = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch (error){
        console.error("Error al obtener todos los usuarios", error);
        res.status(500).json({ message: "Error el servidor", error: error.message})
    }
}