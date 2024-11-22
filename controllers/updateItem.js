import { Item } from "../models/itemModel.js";


export const updateItem = (req, res) => {
    const {id} = req.params;
    const updateItem = Item.update(id, req.body);
    if (!updateItem){
        return res.status(404).json({message: 'Item not found.'});
    };
    res.status(200).json(updateItem);
};