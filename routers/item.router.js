const express = require('express');
const {
  getItem,
  getItems,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/item.controller');

const itemRouter = express.Router();

itemRouter.route('/:id').get(getItem).put(updateItem).delete(deleteItem);
itemRouter.route('/').post(addItem).get(getItems);

module.exports = itemRouter;