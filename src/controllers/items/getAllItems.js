import Item from "../../models/itemModel.js";

export const getAllItems = async (req, res) => {
try {
    const items = await Item.find();
    res.status(200).json(items);
} catch (error) {
    console.error("Error al obtener los ítems:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
}
};
