import Item from "../../models/itemModel.js";

export const updateItem = async (req, res) => {
const { id } = req.params;
  const updateData = req.body;

try {
    const updatedBlog = await Item.findByIdAndUpdate(
    id, 
    updateData, 
      { new: true }
    );

    if (!updatedBlog) {
    return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedBlog);
} catch (error) {
    console.error("Error al actualizar el ítem:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
}
};
