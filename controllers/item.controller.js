const Item = require('../models/item.model');

const getItem = async (req, res, next) => {
    try {
      const id = req.params.id;
      const item = await ItemModel.findById(id).populate('product');
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const addItem = async (req, res, next) => {
  try {
    const item = new Item(req.body);
    const newItem = await item.save();
    res.json(newItem);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedItem);
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getItem,
  getItems,
  addItem,
  updateItem,
  deleteItem
};
