import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
},
filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  
},
});

const fileFilter = (req, file, cb) => {
const fileTypes = /jpeg|jpg|png/; 
const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
const mimeType = fileTypes.test(file.mimetype);

if (extname && mimeType) {
    return cb(null, true);
} else {
    cb(new Error('Solo se permiten imágenes JPG, JPEG, PNG'));
}
};

const upload = multer({
storage: storage,
fileFilter: fileFilter,
}).single('images');  // El nombre del campo debe coincidir con 'images' en el frontend

export default upload;
