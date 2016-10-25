const User = require('../models/userModel.js');

module.exports = {
  getUser: (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).exec()
      .then((user) => {
        if (user) {
          res.json(user.id);
        } else {
          res.status(404).end('User not found');
        }
      });
  },

  addUser: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username, password }).exec()
      .then((user) => {
        if (user) {
          res.status(404).end('User already exists');
        } else {
          User.create({ username, password })
            .then((newUser) => {
              res.json(newUser.id);
            });
        }
      });
  },

  deleteUserMeal: (userId, mealId) => User.findOne({ _id: userId })
    .then((foundUser) => {
      foundUser.meals.splice(foundUser.meals.indexOf(mealId), 1);
      return User.findByIdAndUpdate({ _id: userId }, { $set: { meals: foundUser.meals } }, { new: true });
    })
    .then(updatedUser => updatedUser),

  addUserMeal: (userId, mealId) => User.findOne({ _id: userId })
    .then((foundUser) => {
      const newArr = foundUser.meals.concat([mealId]);
      return User.findByIdAndUpdate({ _id: userId }, { $set: { meals: newArr } }, { new: true });
    })
    .then(updatedUser => updatedUser),
};
