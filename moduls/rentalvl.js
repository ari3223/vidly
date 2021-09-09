const joi = require('joi'),
      mongoose = require('mongoose'),
      {generSchema} = require('./genervl.js');

const rental = mongoose.model('rental', new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {
                type: 'String',
                required: true,
                trim: true,
                minLength: 3,
                maxLength:70
            },
            genre: {
                type: generSchema
            }
        })
    }, 
    customar: {
        type: new mongoose.Schema({
            name: { 
                type: 'string', 
                minLength: 3, 
                maxLength: 12, 
                required: true
            },
        
            isGold: Boolean,
        
            phone: { 
                type: String,
                Math: /^09/,
                required: function () {return this.isGold},
            }
        })
    }, 
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    rentout: {
        type: Date,
        default: Date.now,
        
    },
    rentReturn:{
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    } 
}), 'rental');

function validate(rental) {
    const Rental = joi.object({
        cusId: joi.objectId().required(),
        movieId: joi.objectId().required()
    });
    return Rental.validate(rental);
}


exports.Rental = rental;
exports.validate = validate;



