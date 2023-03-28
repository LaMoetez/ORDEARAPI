const express = require('express');
const {
  getChoice,
  getChoices,
  addChoice,
  updateChoice,
  deleteChoice
} = require('../controllers/choice.controller');

const choiceRouter = express.Router();

choiceRouter.route('/:id').get(getChoice).put(updateChoice).delete(deleteChoice);
choiceRouter.route('/').post(addChoice).get(getChoices);

module.exports = choiceRouter;