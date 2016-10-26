const mongoose = require('mongoose');
const IngredientSchema = require('./ingredientSchema.js');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mealIds: { type: [Schema.Types.ObjectId], ref: 'meal' },
  pastMealIds: { type: [Schema.Types.ObjectId], ref: 'meal' },
  pastMealsObjs: [],
  mealsObjs: [],
  shoppingList: [IngredientSchema],
});

module.exports = UserSchema;
