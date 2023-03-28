const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nameFR: {
    type: String,
    required: true,
  },
  nameAng: {
    type: String,
    required: true,
  },
  disponibility: {
    type: Boolean,
    required: true,
    default: true,
  },
  disponibilityDuration: {
    type: Date,
    required: false,
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;