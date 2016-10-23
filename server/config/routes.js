const recipeRouter = require('./routers/recipe.js');

module.exports = (app) => {
  app.use('/api/recipe', recipeRouter);
};
