import express from 'express';
import multer from 'multer';
import Item from "../../models/itemModel.js"; // Ajusta la ruta si es necesario

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname.split('.').pop());
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/items', upload.single('image'), async (req, res) => {
    const { userName, title, talle, price, category, color } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!userName || !title || !talle || !price || !category || !color) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    try {
        const newItem = new Item({
            userName,
            title,
            talle,
            price,
            category,
            color,
            imageUrl,
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error al crear el ítem:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

export default router;