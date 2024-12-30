import Item from "../../models/itemModel.js"; 
import logger from "../../utils/logger.js";

export const createItem = async (req, res) => {
  const {
    userName,
    title,
    talle,
    price,
    category,
    color,
    images,
  } = req.body;

  if (
    !userName ||
    !title ||
    !talle ||
    !price ||
    !category ||
    !color ||
    !images
  ) {
    logger.warn("Faltan campos obligatorios en la solicitud para crear un ítem.");
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    // Creación del nuevo ítem
    const newItem = new Item({
      userName,
      title,
      talle,
      price,
      category,
      color,
      images,
    });

    await newItem.save();
    logger.info(`Ítem creado con éxito: ${newItem._id}`);

    res.status(201).json(newItem);
  } catch (error) {
    logger.error(`Error al crear el ítem: ${error.message}`, {
      stack: error.stack,
      data: req.body,
    });

    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
