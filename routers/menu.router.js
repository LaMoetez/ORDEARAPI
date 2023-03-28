const express = require('express');
const {
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu
} = require('../controllers/menu.controller');

const menuRouter = express.Router();

menuRouter.route('/:id').get(getMenu).put(updateMenu).delete(deleteMenu);
menuRouter.route('/').post(addMenu);

module.exports = menuRouter;
