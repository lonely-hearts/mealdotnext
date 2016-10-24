const mongoose = require('mongoose');

const mongoUser = 'hog';
const mongoPassword = 'wild';
const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@ds031167.mlab.com:31167/mealdotnext`;
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongodb connection open'));

module.exports = db;
