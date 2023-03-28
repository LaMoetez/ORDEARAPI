const express = require('express');
const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
productRouter.route('/').post(addProduct).get(getProducts);

module.exports = productRouter;