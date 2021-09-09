const mongoose = require('mongoose'),
      joi      = require('joi');

const customer = mongoose.model('customar', new mongoose.Schema({
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
}), 'customar');

function validate0(goted) {
    const customarvl = joi.object({
        name: joi.string().min(3).max(15).required(),
        isGold: joi.boolean().required(),
        phone: joi.string()
    });

    return customarvl.validate(goted);
}

exports.validate = validate0;
exports.customer = customer;