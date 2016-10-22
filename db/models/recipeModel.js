const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  food: String,
  quantity: Number,
  measure: String,
  weight: Number,
});

const NutrientSchema = new mongoose.Schema({
  label: String,
  tag: String,
  hasRDI: Boolean,
  quantity: Number,
  unit: String,
  daily: Number,
});

const RecipeSchema = new mongoose.Schema({
  q: String,
  uri: String,
  label: String,
  image: String,
  servings: Number,
  healthLabels: [String],
  dietLabels: [String],
  ingredients: [IngredientSchema],
  calories: Number,
  totalWeight: Number,
  totalNutrients: [NutrientSchema],
});

module.exports = mongoose.model('recipe', RecipeSchema);
