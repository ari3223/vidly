const winston = require('winston'),
      mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb+srv://Armin:.Rmin@cluster0.japtb.mongodb.net/vidly?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true/*, useFindAndModify: false */})
    .then( () => { winston.info('Connected to MongoDB...') });
}