const User = require('../models/userModel.js');
const mealController = require('./mealController.js');
const jwt = require('jsonwebtoken');
const secret = require('../../server/config/config.js').secret;
const bcrypt = require('bcrypt-nodejs');

exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id }).exec()
    .then((user) => {
      if (user) {
        mealController.resolveRecipeIds(user.mealIds)
        .then((recipeObjs) => {
          user.mealsObjs = recipeObjs;
          return mealController.resolveRecipeIds(user.pastMealIds);
        })
        .then((pastMealsObjs) => {
          user.pastMealsObjs = pastMealsObjs;
          return user;
        })
        .then((updatedUser) => {
          console.log(updatedUser);
          res.json(updatedUser);
        });
      } else {
        res.status(404).end('User not found');
      }
    }).catch(() => res.status(404).end('User not found'));
};

exports.addUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username }).exec()
    .then((user) => {
      if (user) {
        res.status(404).end('User already exists');
      } else {
        User.create({ username, password })
          .then((newUser) => {
            const token = jwt.sign(newUser, secret, { expiresIn: 60 * 60 });
            const userId = newUser.id;
            res.json({ token, username, userId });
          });
      }
    });
};

exports.authenticateUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username }).exec()
    .then((user) => {
      if (!user) {
        res.status(404).end('Authentication failed. User/password combination not found');
      } else {
        const salt = user.salt;
        if (bcrypt.hashSync(password, salt) === user.password) {
          const token = jwt.sign(user, secret, { expiresIn: 60 * 60 });
          const userId = user.id;
          res.json({ token, userId, username });
        } else {
          res.status(404).end('Authentication failed. User/password combination not found');
        }
      }
    });
};

exports.deleteUserMeal = (userId, mealId) => User.findOne({ _id: userId })
    .then((foundUser) => {
      foundUser.mealIds.splice(foundUser.mealIds.indexOf(mealId), 1);
      return User.findByIdAndUpdate({ _id: userId }, { $set: { mealIds: foundUser.mealIds } }, { new: true });
    })
    .then(updatedUser => updatedUser);

exports.addUserMeal = (userId, mealId) => User.findOne({ _id: userId })
    .then((foundUser) => {
      foundUser.mealIds.push(mealId);
      return User.findByIdAndUpdate({ _id: userId }, { $set: { mealIds: foundUser.mealIds } }, { new: true });
    })
    .then(updatedUser => updatedUser);

exports.eatUserMeal = (userId, mealId) => User.findOne({ _id: userId })
    .then((foundUser) => {
      foundUser.mealIds.splice(foundUser.mealIds.indexOf(mealId), 1);
      foundUser.pastMealIds.push(mealId);
      return User.findByIdAndUpdate({ _id: userId }, { $set: { mealIds: foundUser.mealIds, pastMealIds: foundUser.pastMealIds } }, { new: true });
    })
    .then(updatedUser => updatedUser);
