const Recipe = require('../models/recipeModel.js');
const keys = require('../../server/config/config.js');
const rp = require('request-promise');

const APIURL = 'https://api.edamam.com/search?q=';

module.exports = {
  findRecipes: (req, res) => {
    const query = req.params.q;
    Recipe.find({ q: query }).exec()
      .then((storedRecipes) => {
        if (storedRecipes.length === 0) {
          const queryString = `${APIURL}${query}&app_id=${keys.APP_ID}&app_key=${keys.APP_KEY}`;
          rp(queryString)
            .then((body) => {
              const newRecipes = JSON.parse(body).hits
                                 .map(recipeContainer => recipeContainer.recipe);
              Recipe.create(newRecipes)
                .then((recipes) => {
                  res.json(recipes);
                });
            });
        } else {
          res.json(storedRecipes);
        }
      });
  },
};
