import { Item } from "../models/itemModel.js";

export const getItemById = (req, res) => {
    const { id } = req.params;  
    const item = Item.getById(id);  

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);  
};