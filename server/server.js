const express = require('express');

const app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(8000, () => {
  console.log('Listening on port 8000');
});

module.exports = app;
