import Item from "../../models/itemModel.js";
import logger from "../../utils/logger.js"; // Importa el logger configurado

export const deleteItem = async (req, res) => {
const { id } = req.params;

if (!id) {
    logger.warn("Solicitud de eliminación recibida sin proporcionar un ID.");
    return res
    .status(400)
    .json({ message: "El ID del ítem es obligatorio para eliminarlo." });
}

try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
    logger.warn(`No se encontró un item con el ID: ${id}`);
    return res.status(404).json({ message: "Ítem no encontrado." });
    }

    logger.info(`Item eliminado con éxito: ${id}`);
    res.status(200).json({ message: "Ítem eliminado con éxito." });
} catch (error) {
    logger.error("Error al eliminar el item:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Error en el servidor", error: error.message });
}
};
