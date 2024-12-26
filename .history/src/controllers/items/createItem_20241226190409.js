import Item from "../../models/itemModel.js";
import upload from "../../middlewares/multerConfig.js"; // Importar configuración de Multer

// Crear un ítem con imagen
export const createItem = async (req, res) => {
  const {
    userName,
    title,
    talle,
    price,
    category,
    color,
  } = req.body;

  const image = req.file ? req.file.path : null;  // Usamos Multer para almacenar el archivo

  if (
    !userName ||
    !title ||
    !talle ||
    !price ||
    !category ||
    !color ||
    !image
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newItem = new Item({
      userName,
      title,
      talle,
      price,
      category,
      color,
      images: image, // Guardamos la ruta de la imagen
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error al crear el ítem:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
