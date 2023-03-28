const express = require('express');
const {
    getRestaurant,
    getRestaurants,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurant.controller');

const restaurantRouter = express.Router();

restaurantRouter.route('/:id').get(getRestaurant).put(updateRestaurant).delete(deleteRestaurant);
restaurantRouter.route('/').post(addRestaurant).get(getRestaurants);

module.exports = restaurantRouter;

