import { Router } from "express";
import multer from "multer";
import path from "path";
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../controllers/";
import { authorize, protect } from "../middlewares/authMiddlewares.js";

const router = Router();

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

// Rutas de GET
router.get('/', protect, getAllItems);  // Listar todos los ítems
router.get('/:id', protect, getItemById);  // Obtener un ítem por ID

// Ruta de POST para crear un ítem (incluye la carga de imagen)
router.post('/', protect, authorize("admin"), upload.single('images'), createItem);

// Ruta de PUT para actualizar un ítem por ID (incluye la carga de imagen)
router.put('/:id', protect, authorize("admin"), upload.single('images'), updateItem);

// Ruta de DELETE para eliminar un ítem por ID
router.delete('/:id', protect, authorize("admin"), deleteItem);

export default router;
