const express = require('express');

const app = express();

require('./config/connection.js');
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
