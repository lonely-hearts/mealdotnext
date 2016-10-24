const mongoose = require('mongoose');
const Recipe = require('./recipeModel.js');
const User = require('./userModel.js');
mongoose.Promise = require('bluebird');

const MealSchema = new mongoose.Schema({
	// userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // needs to be activated when implemented
	recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'recipe' },
	haveIngredient: Boolean,
},{timestamps: true});


module.exports = mongoose.model('meal', MealSchema);