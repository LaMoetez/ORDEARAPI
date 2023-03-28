const express = require('express');
const {
    getCategory,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');

const categoryRouter = express.Router();

categoryRouter.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);
categoryRouter.route('/').post(addCategory).get(getCategories);

module.exports = categoryRouter;

