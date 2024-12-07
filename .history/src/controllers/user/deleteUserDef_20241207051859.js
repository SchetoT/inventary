/* import Author from "../../models/authorModel.js";

export const deleteAuthor = async (req, res) => {

    const { id } = req.params;
    await Author.findByIdAndDelete(id);
    res.status(204).json({ message: "Usuario eliminado" });
    
}; */