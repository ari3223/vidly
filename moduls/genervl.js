const joi     = require('joi');
const mongoose = require('mongoose');

const schgener = new mongoose.Schema({
    main: { type: String, minLength:3, required: true },
})
const categorys =  mongoose.model('geners', schgener, 'geners');

function validate(inner) {
    const genersScema = joi.object ({
        main: joi.string().min(3).required(),
        subset: joi.array().max(4)
    })

    return genersScema.validate(inner)
}

exports.valid = validate;
exports.Gener = categorys;
exports.generSchema = schgener;