const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/mealnext');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
