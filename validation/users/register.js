const Validator = require('validator');
const validText = require('../valid-text');

module.exports = function(data){
    let errors = {};
    data.email = validText(data.email) ? data.email : '';
    data.firstName = validText(data.firstName) ? data.firstName : '';
    data.lastName = validText(data.lastName) ? data.lastName : '';
    data.password = validText(data.password) ? data.password : '';
    // data.admin = validText(data.admin) ? data.admin : '';

    if (!Validator.isEmail(data.email)){
        errors.email = "Invalid Email";
    }

    if (Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    if (Validator.isEmpty(data.firstName)){
        errors.firstName = 'firstName field is required';
    }

    if (Validator.isEmpty(data.lastName)){
        errors.lastName = 'lastName field is required';
    }

    // if (Validator.isBoolean(data.admin)){
    //     errors.admin = 'admin field is required';
    // }

    if (Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}