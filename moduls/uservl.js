const mongoose = require('mongoose'),
      jwt      = require('jsonwebtoken'),
      config   = require('config')
      passwordComplexity = require("joi-password-complexity"),
      joi      = require('joi');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true,
    },
    email: { 
        type: String,
        unique: true,
        minLength:13,
        maxLength:50,
        required: true,
        match: /.*@gmail.com.*/ 
    },
    password: { 
        type: String,
        minLength: 6,
        required: true,
        trim: true
    },
    isadmin: Boolean
});
userSchema.methods.generatesAuthToken = function (){
    const token = jwt.sign({ _id: this._id, isadmin: this.isadmin}, config.get('jwtpaskey'));
    return token;
}

const User = mongoose.model('user', userSchema,'user');
// .validate(req.body.password));
function validate(user) {
    const usSchema = joi.object({
        name: joi.string().min(3).max(255).required(),
        email: joi.string().min(10).max(40).required(),
        password: passwordComplexity({
            min: 8,
            max: 30,
            lowerCase: 1,
            upperCase: 2,     
        }),
        isadmin: joi.boolean()
    });

    return usSchema.validate(user);
};



exports.validate = validate;
exports.User = User;


