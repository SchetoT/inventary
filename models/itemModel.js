//title
//author
//stock
//talle
//descripcion
//precio
//categoria
//color
//fecha de creacion
//imagenes
//descuentos o promociones
let items = []; // Declaración de los elementos

export const Item = {
  getAll: () => items,

  getById: (id) => {
    const item = items.find((item) => item.id === id);
    if (!item) {
      console.log("Item not found");
      return null;
    }
    return item;
  },

  create: (newItem) => {
    if (!newItem.id) {
      console.error('Item must have an id');
      return null;
    }
    items.push(newItem);
    return newItem;
  },

  update: (id, updateItem) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updateItem };
      console.log(items[index]);
      return items[index];
    }
    console.log('Item not found for update');
    return null;
  },

  delete: (id) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      const deletedItem = items.splice(index, 1);
      console.log({ deletedItem });
      return deletedItem[0];
    }
    console.log('Item not found for deletion');
    return null;
  },
};