import Item from "../../models/itemModel.js"
export const getItemById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const item = await Item.findById(id);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
    } catch (error) {
    console.error("Error al obtener el ítem:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};