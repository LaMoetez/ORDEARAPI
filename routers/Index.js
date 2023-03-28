const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const AuthRouter = require('./auth.router');
const userSpaceRouter = require('./user.router');
const menuRouter= require("./menu.router")
const restaurantRouter = require('./restaurant.router')
const categoryRouter = require('./category.router')
const productRouter = require('./product.router')
const choiceRouter = require('./choice.router')
const itemRouter = require('./item.router')
const passportRouter = require('./passport.rouer');




router.use(cookieParser());

router.use('/auth', AuthRouter);
router.use('/user', userSpaceRouter);
router.use('/menu',menuRouter)
router.use('/restaurant' ,restaurantRouter)
router.use('/category' ,categoryRouter)
router.use('/product' ,productRouter)
router.use('/choice' ,choiceRouter)
router.use('/item' ,itemRouter)
router.use('/auth', passportRouter);

module.exports = router;


