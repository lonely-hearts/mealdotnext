const express = require('express');
// const loggedIn = require('../auth.js').loggedIn;
const passport = require('../auth.js').passport;
const userController = require('../../../db/controllers/userController.js');
// const routerProtected = new express.Router();
const router = new express.Router();

router.route('/login')
  .get((req, res) => {
    res.status(200).end('PLS LOGIN');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }));

router.route('/logout')
  .get((req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  });

router.route('/signup')
  .get((req, res) => {
    res.status(200).end('PLS SIGNUP');
  })
  .post(userController.addUser);

module.exports = router;
