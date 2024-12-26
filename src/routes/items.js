import multer from 'multer';
import path from 'path';
import { createItem } from '../../controllers/items/createItem.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Aquí se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename = Date.now() + fileExt;  // Nombra el archivo con el tiempo actual
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('images'), createItem);  // 'images' es el nombre del campo de la imagen
