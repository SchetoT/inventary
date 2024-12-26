import Item from "../../models/itemModel.js"; 
import { Multer } from "multer";

const upload = multer({dest: 'uploads/'});
app.post('/upload', upload.single('imges'), (req, res) => {
  res.sed
}


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
      images,
    });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error al crear el ítem:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
