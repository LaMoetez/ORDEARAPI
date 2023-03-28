const Choice = require('../models/choice.model');
const product = require('../models/product.model')

const getChoice = async (req, res, next) => {
    try {
      const id = req.params.id;
      const choice = await ChoiceModel.findById(id).populate('product');
      res.json(choice);
    } catch (error) {
      next(error);
    }
  };

const getChoices = async (req, res, next) => {
  try {
    const choices = await Choice.find();
    res.json(choices);
  } catch (err) {
    next(err);
  }
};

const addChoice = async (req, res, next) => {
  try {
    const choice = new Choice(req.body);
    const newChoice = await choice.save();
    const productIds = req.body.productIds;
    for (let i = 0; i < productIds.length; i++) {
      const product = await Product.findById(productIds[i]);
      product.choices.push(savedChoice._id);
      await product.save();
    };
    for (let i = 0; i < items.length; i++) {
      const item = new Item({
        name: items[i].name,
        price: items[i].price,
        choice: savedChoice._id,
        disponibility: item[i].disponibility,
        disponibitityDuration: item[i].disponibitityDuration
      });
      await item.save();
    }
    res.json(newChoice);
  } catch (err) {
    next(err);
  }
};

const updateChoice = async (req, res, next) => {
  try {
    const updatedChoice = await Choice.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedChoice);
  } catch (err) {
    next(err);
  }
};

const deleteChoice = async (req, res, next) => {
  try {
    await Choice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Choice deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getChoice,
  getChoices,
  addChoice,
  updateChoice,
  deleteChoice
};
