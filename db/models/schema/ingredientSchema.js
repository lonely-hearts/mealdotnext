const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  food: String,
  quantity: Number,
  measure: String,
  weight: Number,
});

module.exports = IngredientSchema;
