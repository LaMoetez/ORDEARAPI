const Category = require('../models/category.model');

const getCategory = async (req, res, next) => {
    try {
      const id = req.params.id;
      const category = await CategoryModel.findById(id).populate('product');
      res.json(category);
    } catch (error) {
      next(error);
    }
  };

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    const newCategory = await category.save();
    res.json(newCategory);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {...req.body,disponibilityDuration:new Date().setHours(new Date().getHours()+req.body.disponibilityDuration)}, {
      new: true
    });
    res.json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategory,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
};
