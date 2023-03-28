const product = require('../models/product.model');
const choice = require('../models/choice.model')

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    res.json(product);
  } catch (error) {
    next(error);
  }
};
const getProducts = async (req, res, next) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};
const addProduct = async (req, res, next) => {
  try {
    const { nameFR, nameAng, disponibility, requiredStatus, quantityStatus, supplement, disponibilityDuration, category } = req.body;
    const product = new Product({ nameFR, nameAng, disponibility, requiredStatus, quantityStatus, supplement, disponibilityDuration, category });
    const choiceIds = req.body.choiceIds;
    for (let i = 0; i < choiceIds.length; i++) {
      const choice = await Choice.findById(choiceIds[i]);
      choice.products.push(savedProduct._id);
      await choice.save();
    }
    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { nameFR, nameAng, disponibility, requiredStatus, quantityStatus, supplement, disponibilityDuration, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { nameFR, nameAng, disponibility, requiredStatus, quantityStatus, supplement, disponibilityDuration, category},
      { new: true }
    );
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
};
