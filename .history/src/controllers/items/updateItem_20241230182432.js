import Item from "../../models/itemModel.js";
import logger from "../../utils/logger.js";

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id || Object.keys(updateData).length === 0) {
    logger.warn("Solicitud de actualización sin ID o sin datos para actualizar.");
    return res.status(400).json({ message: "El ID y los datos de actualización son obligatorios." });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      logger.warn(`No se encontró un ítem con el ID: ${id}`);
      return res.status(404).json({ message: "Ítem no encontrado." });
    }

    logger.info(`Ítem actualizado con éxito: ${updatedItem._id}`, { updatedData: updatedItem });
    res.status(200).json(updatedItem);
  } catch (error) {
    logger.error("Error al actualizar el ítem:", { error: error.message, stack: error.stack });
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
