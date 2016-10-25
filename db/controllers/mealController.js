const Recipe = require('../models/recipeModel.js');
const Meal = require('../models/mealModel.js');
const userController = require('./userController.js');

exports.saveMeal = (req, res) => {
  new Meal({
    userId: req.body.userId,
    recipeId: req.body.recipeId,
    haveIngredient: false,
  })
  .save()
  .then((savedMeal) => {
    userController.addUserMeal(savedMeal.userId, savedMeal['_id'])
    .then((updatedUser) => {
      console.log('Updated User:', updatedUser);
      res.status(200).send('Meal saved');
    });
  });
};

exports.deleteMeal = (req, res) => {
  Meal.findOneAndRemove({ _id: req.params.mealId })
  .then((deletedMeal) => {
    userController.deleteUserMeal(deletedMeal.userId, req.params.mealId)
    .then((updatedUser) => {
      console.log('delete updated User:', updatedUser);
      res.status(200).send('Meal deleted');
    });
  });
};

exports.getAllMeals = (req, res) => {
  Meal.find({
    userId: req.params.userId,
  })
  .then((userMeals) => {
    const allMeals = userMeals.map(meal => Recipe.findOne({ _id: meal.recipeId })
    .exec()
    .then((recipe) => {
      meal.recipe = recipe;
      return meal;
    }));
    return Promise.all(allMeals).then((mealObjs) => {
      console.log('Meals found for User:', mealObjs);
      return mealObjs;
    });
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
