import { Item } from "../models/itemModel.js";

export const getAllItems = (_, res)=> {
    const items = Item.getAll();
    res.status(200).json(Item.getAll());
};