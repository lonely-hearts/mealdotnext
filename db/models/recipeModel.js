const mongoose = require('mongoose');

const RecipeSchema = require('./schema/recipeSchema.js');

module.exports = mongoose.model('recipe', RecipeSchema);
