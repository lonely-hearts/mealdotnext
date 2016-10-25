const recipeRouter = require('./routers/recipe.js');
const userRouter = require('./routers/user.js');
const mealRouter = require('./routers/meal.js');

module.exports = (app) => {
  app.use('/api/recipe', recipeRouter);
  app.use('/api/user', userRouter);
  app.use('/api/meal', mealRouter);
};
