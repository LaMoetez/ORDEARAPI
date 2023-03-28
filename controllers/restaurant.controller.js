const Restaurant = require('../models/restaurant.model');

const getRestaurant = async (req, res, next) => {
    try {
      const id = req.params.id;
      const restaurant = await RestaurantModel.findById(id).populate('menu');
      res.json(restaurant);
    } catch (error) {
      next(error);
    }
  };

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
};

const addRestaurant = async (req, res, next) => {
  try {
    const restaurant = new Restaurant(req.body);
    const newRestaurant = await restaurant.save();
    return (res.json(newRestaurant));
  } catch (err) {
    next(err);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedRestaurant);
  } catch (err) {
    next(err);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRestaurant,
  getRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant
};
