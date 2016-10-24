const mongoose = require('mongoose');
const IngredientSchema = require('./ingredientSchema.js');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  meals: { type: [Schema.Types.ObjectId], ref: 'meal' },
  shoppingList: [IngredientSchema],
});

module.exports = UserSchema;
