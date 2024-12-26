import multer from 'multer';
import path from 'path';
import Item from "../../models/itemModel.js";
import express from 'express';

// Configuración de Multer para almacenar las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // La carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  // Crear un nombre único para cada imagen
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Asignar nombre y extensión
  }
});

const upload = multer({ storage: storage });

// Ruta para cargar la imagen
app.post('/upload', upload.single('images'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se cargó ninguna imagen' });
  }
  res.json({ message: 'Imagen subida', file: req.file });
});

// Función para crear el item
export const createItem = async (req, res) => {
  const {
    userName,
    title,
    talle,
    price,
    category,
    color,
  } = req.body;
  const image = req.file ? req.file.path : null;  // Guardar la ruta de la imagen

  if (
    !userName ||
    !title ||
    !talle ||
    !price ||
    !category ||
    !color ||
    !image  // Verificar si hay imagen
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required." });
  }

  try {
    const newItem = new Item({
      userName,
      title,
      talle,
      price,
      category,
      color,
      images: image,  // Guardar la ruta de la imagen en el campo 'images'
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error al crear el ítem:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};