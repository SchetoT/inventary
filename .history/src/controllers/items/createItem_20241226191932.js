import Item from "../../models/itemModel.js";

// Función para crear el ítem
export const createItem = async (req, res) => {
  const {
    userName,
    title,
    talle,
    price,
    category,
    color,
  } = req.body;

  // Si la imagen fue cargada, la ruta será almacenada en req.file.path
  const image = req.file ? req.file.path : null;  // Guardar la ruta de la imagen

  // Validación de los campos
  if (
    !userName ||
    !title ||
    !talle ||
    !price ||
    !category ||
    !color ||
    !image  // Verificar si hay imagen
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Crear un nuevo ítem
    const newItem = new Item({
      userName,
      title,
      talle,
      price,
      category,
      color,
      images: image,  // Guardar la ruta de la imagen en el campo 'images'
    });

    // Guardar el ítem en la base de datos
    await newItem.save();

    // Responder con el ítem creado
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error al crear el ítem:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
