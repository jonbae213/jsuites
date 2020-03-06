const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    
    firstName: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    admin: {
        type: Boolean,
        default: false
    },
    
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'departments'
    },

    eventIds: [{
        type: Schema.Types.ObjectId,
        ref: 'events'
    }],


    
    
    timeCreated: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', UserSchema)
module.exports = User