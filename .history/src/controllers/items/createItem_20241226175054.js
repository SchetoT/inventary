import express from 'express';
import multer from 'multer';
import Item from "../../models/itemModel.js";

const router = express.Router();

// Configuración de Multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    },
});

const upload = multer({ storage: storage });

router.post('/items', upload.single('image'), async (req, res) => {
    const { userName, title, talle, price, category, color } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Obtiene la URL de la imagen

    if (
        !userName ||
        !title ||
        !talle ||
        !price ||
        !category ||
        !color
    ) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        const newItem = new Item({
            userName,
            title,
            talle,
            price,
            category,
            color,
            imageUrl, // Guarda la URL de la imagen en la base de datos
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error al crear el ítem:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

export default router
//