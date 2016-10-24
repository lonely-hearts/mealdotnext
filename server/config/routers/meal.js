const express = require('express');
const mealController = require('../../../db/controllers/mealController.js');

const router = new express.Router();

router.route('/')
  .get((req, res) => {
    res.end('Spread the Meals!');
  });

router.route('/:userId')
  .get(mealController.getAllMeals);

router.route('/')
  .post(mealController.saveMeal);

router.route('/')
  .delete(mealController.deleteMeal);

router.route('/')
  .put(mealController.updateMeal);


module.exports = router;