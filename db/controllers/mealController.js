const Recipe = require('../models/recipeModel.js');
const Meal = require('../models/mealModel.js');
// const User = require('../models/userModel.js');

exports.saveMeal = (req, res) => {
  new Meal({
    userId: req.body.userId,
    recipeId: req.body.recipeId,
    haveIngredient: false,
  })
  .save()
  .then((savedMeal) => {
    console.log('saved Meal:', savedMeal);
    res.send('Meal saved');
  });
};

exports.deleteMeal = (req, res) => {
  Meal.remove({
    _id: req.body.mealId,
  })
  .then((deletedMeal) => {
    console.log('deleted Meal:', deletedMeal.result);
    res.send('Meal deleted');
  });
};

exports.getAllMeals = (req, res) => {
  console.log(req.params.userId);
  Meal.find({
    userId: req.params.userId,
  })
  .then((userMeals) => {
    const allMeals = userMeals.map(meal => Recipe.findOne({ _id: meal.recipeId }).exec()
    .then((recipe) => {
      meal.recipe = recipe;
      return meal;
    }));
    console.log('Meals found for User:', userMeals);
    return Promise.all(allMeals).then(mealObjs => mealObjs);
  })
  .then((completeMeals) => {
    res.json(completeMeals);
  });
};

exports.updateMeal = (req, res) => {
  Meal.findByIdAndUpdate(req.body.mealId, { $set: { haveIngredient: req.body.haveIngredient } },
    { new: true }, (err, meal) => {
      console.log('Updated', meal);
      res.json(meal);
    });
};
