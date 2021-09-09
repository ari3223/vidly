const joi     = require('joi');
const mongoose = require('mongoose');
const {generSchema} = require('./genervl.js');


const movie = mongoose.model('movies', new mongoose.Schema({
    title: {
        type: 'String',
        required: true,
        trim: true,
        minLength: 3,
        maxLength:70
    },
    genre: {
        type: generSchema,
        required: true
    },
    numberInStock: { 
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: { 
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
}), 'movies');

function validate(movies) {
    const schemovie = joi.object({
        title: joi.string().min(0).max(70).required(),
        generId: joi.objectId().required(),
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()
    });

    return schemovie.validate(movies);
}


exports.validate = validate;
exports.movie = movie;