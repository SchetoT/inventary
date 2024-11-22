import { Item } from "../models/itemModel.js";

export const deleteItem = (req, res) => {
    const {id}= req.params;
    const deleteItem = Item.delete(id);
    if (!deleteItem){
        return res.status(404).json({message: 'Item not found'})
    };
    res.status(200).json({message : 'Item deleted'});

    
};