import { Router } from "express";
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../index.js";
import { authorize, protect } from "../middlewares/authMiddlewares.js";
im 
const router = Router();
//GET*
router.get('/', protect,compression, getAllItems);
router.get('/:id',protect,getItemById);

//POST
router.post('/', protect, authorize("admin"), createItem);

//PUT
router.put('/:id', protect, authorize("admin"), updateItem);

//DELETE
router.delete('/:id', protect, authorize("admin"), deleteItem);

export default router; 