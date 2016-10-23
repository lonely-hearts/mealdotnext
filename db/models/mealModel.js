const mongoose = require('mongoose');
const Recipe = require('./recipeModel.js');
const User = require('./userModel.js');

const MealSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'recipe' },
	haveIngredient: Boolean,
},{timestamps: true});


module.exports = mongoose.model('meal', MealSchema);