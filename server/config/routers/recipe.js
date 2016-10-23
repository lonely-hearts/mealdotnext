const express = require('express');
const recipeController = require('../../../db/controllers/recipeController.js');

const router = new express.Router();

router.route('/')
  .get((req, res) => {
    res.end('Hello world');
  });

router.route('/:q')
  .get(recipeController.findRecipes);
module.exports = router;
