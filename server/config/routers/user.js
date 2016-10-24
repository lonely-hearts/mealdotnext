const express = require('express');
const userController = require('../../../db/controllers/userController.js');

const router = new express.Router();

router.route('/:username')
  .get(userController.getUser);

router.route('/')
  .post(userController.addUser);

module.exports = router;
