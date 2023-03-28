const Menu = require('../models/menu.model');
const Restaurant = require ('../models/restaurant.model')

const getMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('restaurant');
    res.json(menu);
  } catch (error) {
    next(error);
  }
};
const getMenuByRestaurant = async (req , res , next ) => {
  try {
     const id = req.params.id
     const menu = await Menu.find({ Restaurant: id }).populate([
        'Restaurant'
     ])
     res.json(menu)
  } catch (error) {
     next(error)
  }
}

const addMenu = async (req, res, next) => {
  try {
    const { nameFR, nameAng, restaurant } = req.body;
    const menu = new Menu({ nameFR, nameAng, restaurant });
    await menu.save();
    res.json(menu);
  } catch (error) {
    next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const { nameFR, nameAng, restaurant } = req.body;
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { nameFR, nameAng, restaurant },
      { new: true }
    );
    res.json(menu);
  } catch (error) {
    next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    await Menu.findByIdAndRemove(req.params.id);
    res.json({ message: 'Menu deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuByRestaurant
};
