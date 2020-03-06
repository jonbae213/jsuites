const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'departments'
    },
    
    
    date: {
        type: Date,
        required: true
    },

    // date: {
    //     type: Date,
    //     default: Date.now
    // },

    extras: {
        type: Object,
        required: false
    },

    approved: {
        type: Boolean,
        default: false
    },
    
    timeCreated: {
        type: Date,
        default: Date.now
    }
})

const Event = mongoose.model('Event', EventSchema, 'events')
module.exports = Event
