const Validator = require('validator');
const validText = require('../valid-text');

module.exports = function validateEventInput(data){
    let errors = {};

    
    data.title = validText(data.title) ? data.title : '';
    data.description = validText(data.description) ? data.description : '';
    // data.date = validText(data.date) ? data.date : '';
    
    if (Validator.isEmpty(data.title)){
        errors.title = 'Event title must exist'
    }

    if (Validator.isEmpty(data.description)){
        errors.description = 'Event description must exist'
    }

    // if (Validator.isEmpty(data.date)){
    //     errors.date = 'Please choose an event date'
    // }



    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }



}