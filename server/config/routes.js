const recipeRouter = require('./routers/recipe.js');
const userRouter = require('./routers/user.js');

module.exports = (app) => {
  app.use('/api/recipe', recipeRouter);
  app.use('/api/user', userRouter);
};
