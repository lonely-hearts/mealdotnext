const express = require('express');
const userController = require('../../../db/controllers/userController.js');
const isAuthenticated = require('../auth.js');

const router = new express.Router();

router.get('/:username', isAuthenticated, userController.getUser);

router.route('/')
  .post(userController.addUser);

router.route('/authenticate')
  .post(userController.authenticateUser);

module.exports = router;
