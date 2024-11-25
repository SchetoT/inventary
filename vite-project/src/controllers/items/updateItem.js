import Item from "../../models/itemModel.js";

export const updateItem = async (req, res) => {
const { id } = req.params;
const updatedBlog = await Item.findOneAndUpdate(id);
res.status(200).json(updateItem);
};