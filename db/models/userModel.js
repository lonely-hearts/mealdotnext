const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const UserSchema = new mongoose.Schema({
	name: String,
	pw: String
});


module.exports = mongoose.model('user', UserSchema);