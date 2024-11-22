import { Router } from "express";
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../controllers/index.js";

const router = Router();
//GET
router.get('/', getAllItems);
router.get('/:id',getItemById);

//POST
router.post('/', createItem);

//PUT
router.put('/:id', updateItem);

//DELETE
router.delete('/:id', deleteItem);

export default router; 