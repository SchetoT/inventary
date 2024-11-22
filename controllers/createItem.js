import { Item } from "../models/itemModel.js";

import {v4 as uuid4} from 'uuid';



export const createItem = (req, res) => {
    const {author, tittle, stock, price, color, description, category, date } = req.body;

    if (!author || !tittle || !stock || !price || !color || !description || !category || !date ) {
        return res.status(400).json({message: 'All fields are required.'})
    
    }
    const newItem = {
        id: uuid4(),
        author: author,
        tittle,
        stock,
        price,
        color,
        description,
        category,
        date,
    };
    Item.create(newItem);
    res.status(201);
    return res.status(201).json(newItem)

}
