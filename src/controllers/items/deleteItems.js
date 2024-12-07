import Item from "../../models/itemModel.js";

export const deleteItem = async (req, res) => {
const { id } = req.params;

try {
    const deletedItem = await Item.findByIdAndDelete(id); 

    if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
} catch (error) {
    console.error("Error al eliminar el ítem:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
}
};
