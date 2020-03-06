const Validator = require('validator');
const validText = require('../valid-text');
const validNumber = require('../valid-numbers')

module.exports = function validateDepartmentInput(data){
    let errors = {};

    console.log(data)
    data.name = validText(data.name) ? data.name : '';
    // data.organizationId = validNumber(data.organizationId) ? data.organizationId : '';
    data.organizationId = validText(data.organizationId) ? data.organizationId : '';
    
    
    if (Validator.isEmpty(data.name)){
        errors.title = 'Department name must exist'
    }

    if (Validator.isEmpty(data.organizationId)){
        errors.organizationId = 'Department must belong to an organization'
    }



    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}