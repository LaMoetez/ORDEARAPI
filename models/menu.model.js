const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  nameFR: String,
  nameAng: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
