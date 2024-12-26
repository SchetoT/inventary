import multer from 'multer';
import path from 'path';

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

export default upload;
