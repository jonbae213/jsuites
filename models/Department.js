const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    
    // organizationId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'organizations'
    // },
    organizationId: {
        type: Number,
        required: true
    },
    
    eventIds: [{
        type: Schema.Types.ObjectId,
        ref: 'events'
    }],
    
    timeCreated:{
        type: Date,
        default: Date.now
    }

})
const Department = mongoose.model('Department', DepartmentSchema, 'departments')

module.exports = Department