const Promise = require('bluebird');
const Recipe = require('../models/recipeModel.js');
const Meal = require('../models/mealModel.js');
const userController = require('./userController.js');

exports.saveMeal = (req, res) => {
  Meal.create({
    userId: req.body.userId,
    recipeId: req.body.recipeId,
    haveIngredient: false,
  })
  .then((savedMeal) => {
    userController.addUserMeal(savedMeal.userId, savedMeal['_id'])
    .then((updatedUser) => {
      console.log('Updated User:', updatedUser);
      res.status(200).send('Meal saved');
    });
  })
  .catch((error) => {
    res.status(404).send(`userId or recipeId does not exist. Error is: ${error}`);
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
  })
  .catch((error) => {
    res.status(404).send(`mealId does not exist @deleteMeal. Error is: ${error}`);
  });
};

exports.eatMeal = (req, res) => {
  Meal.findOne({ _id: req.params.mealId })
  .then((eatenMeal) => {
    userController.eatUserMeal(eatenMeal.userId, req.params.mealId)
    .then((updatedUser) => {
      console.log('updated User eaten:', updatedUser);
      res.status(200).send('Meal eaten');
    });
  })
  .catch((error) => {
    res.status(404).send(`mealId does not exist @eatMeal. Error is: ${error}`);
  });
};

exports.resolveRecipeIds = (mealIdArr) => {
  const mealObjs = mealIdArr.map(mealId => Meal.findOne({ _id: mealId })
  .exec()
  .then(mealObj => mealObj));
  return Promise.all(mealObjs)
  .then((mealObjsArr) => {
    const recipeIds = mealObjsArr.map(mealObj => Recipe.findOne({ _id: mealObj.recipeId })
    .exec()
    .then((recipeObj => recipeObj)));
    return Promise.all(recipeIds).then(recipeObjs => recipeObjs);
  });
};

exports.updateMeal = (req, res) => {
  Meal.findByIdAndUpdate(req.body.mealId, { $set: { haveIngredient: req.body.haveIngredient } },
    { new: true }, (err, meal) => {
      if (err) {
        res.status(404).send(`Error at updating Meal. Error is: ${err}`);
      } else {
        console.log('Updated', meal);
        res.json(meal);
      }
    });
};
