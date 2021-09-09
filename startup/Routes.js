const error        = require('../middleware/error.js'),
      customars = require('../routs/customars'),
      geners       = require('../routs/geners.js'),
      movies       = require('../routs/movies.js'),
      rentals      = require('../routs/rentals.js'),
      user         = require('../routs/users.js'),
      auth         = require('../routs/auth.js'),
      express  = require('express');
     
module.exports = function(app) {
    app.use(express.json());
    app.use('/api/customar', customars);
    app.use('/api/geners', geners);
    app.use('/api/movie', movies);
    app.use('/api/rental', rentals);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use(error);
}
