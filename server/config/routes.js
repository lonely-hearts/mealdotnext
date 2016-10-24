const recipeRouter = require('./routers/recipe.js');
const mealRouter = require('./routers/meal.js');

module.exports = (app) => {
  app.use('/api/recipe', recipeRouter);
  app.use('/api/meal', mealRouter);
};
