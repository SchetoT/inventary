
//title
//author
//stock
//talle
//descripcion
//precio
//categoria
//color
//fecha de creacion
//imagenes - veer
//descuentos o promociones --- ver

import mongoose, { Schema } from "mongoose";
import User from "./userModel.js";

const ItemSchema = new Schema({
  userName: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  talle: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  dateCreated: { type: Date, default: () => Date.now() },
  images: { type: [String], required: true }, // Cambiado a un array de strings
});

ItemSchema.post("save", async (doc) => {
  await User.findByIdAndUpdate(doc.userName, { $inc: { itemCreated: 1 } });
});

ItemSchema.post("findOneAndDelete", async (doc) => {
  if (doc.userName) {
    await User.findByIdAndUpdate(doc.userName, { $inc: { itemCreated: -1 } });
  }
});

const Item = mongoose.model("Item", ItemSchema);

export default Item;






