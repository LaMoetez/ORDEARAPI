const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  cuisineType: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  taxe: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  promotion: {
    type: String,
    required: true
  },  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
