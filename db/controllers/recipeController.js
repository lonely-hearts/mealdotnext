const Promise = require('bluebird');
const Recipe = require('../models/recipeModel.js');
const keys = require('../../server/config/config.js');
const request = Promise.promisify(require('request'));

const APIURL = 'https://api.edamam.com/search?q=';

module.exports = {
  findRecipes: (req, res) => {
    const query = req.params.q;
    Recipe.find({ q: query }, (err, recipes) => {
      if (recipes.length === 0) {
        const queryString = `${APIURL}${query}&app_id=${keys.APP_ID}&app_key=${keys.APP_KEY}`;
        request(queryString, (error, response, body) => {
          if (error) {
            res.status(404).send(err);
          }
          res.end(body);
        });
      } else {
        res.end(recipes);
      }
    });
  },
};
