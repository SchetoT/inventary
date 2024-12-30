import Item from "../../models/itemModel.js"; 
import logger from "../../utils/logger.js";
import { body, validationResult } from "express-validator";

export const createItem = [
  
  body('userName').notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('talle').notEmpty().withMessage('El talle es obligatorio'),
  body('price').isNumeric().withMessage('El precio debe ser un número válido'),
  body('category').notEmpty().withMessage('La categoría es obligatoria'),
  body('color').notEmpty().withMessage('El color es obligatorio'),
  body('images').isArray().withMessage('Las imágenes deben ser un array válido'),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.warn("Errores de validación en la solicitud:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, title, talle, price, category, color, images } = req.body;

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
      logger.info(`Ítem creado con éxito: ${newItem._id}`);

      res.status(201).json(newItem);
    } catch (error) {
      logger.error(`Error al crear el ítem: ${error.message}`, {
        stack: error.stack,
        data: req.body,
      });

      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  }
];
