require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')
const joi      = require('joi'),
      mongoose = require('mongoose'),
      config   = require('config'),
      express  = require('express'),
      app      = express();
   
require('./startup/logging')();
require('./startup/db-logic')();
require('./startup/Routes')(app);
//require('./startup/config')();
     







const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Listen on port ${port}`));