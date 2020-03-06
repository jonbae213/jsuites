const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');
const Department = require('../../models/Department')
const passport = require('passport');
const validateEventInput = require('../../validation/events/events');
// const mongoose = require('mongoose')



router.get('/', (req, res) => {
    Event.find()
    .then( events => {
        if (!events || events.length === 0){
            return res.status(404).json({ event: 'there are no events '})
        }
        res.json(events)
    })
})

router.get('/:id', (req, res) => {
    passport.authenticate('jwt', {session: false})
    // console.log(req.params.event_id)
    Event.findById(req.params.id)
    .then( event => {
        if (!event){
            return res.status(404).json({ event: "Event doesn't exist"})
        }
        res.json(event)
    })
})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {isValid, errors} =  validateEventInput(req.body);
        if (!isValid){
            return res.status(400).json(errors);
        }
        // console.log(req.user.departmentId);
        
        const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            creatorId: req.user.id,
            date: req.body.date,
            departmentId: req.user.departmentId,
            // departmentId: '5e27495413dc972b218b0ef5',

            extras: req.body.extras

            // date: req.timeCreated
        });

        newEvent.save().then (event => {
            Department.updateOne({_id: req.user.departmentId}, {
            // Department.findOneAndUpdate({_id: '5e27495413dc972b218b0ef5'}, {

                $addToSet: {
                    eventIds: event._id
                }
            })
            .then( () => res.json(event))
        
            
        })
    }
)

router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
    // console.log(req.body)
    Event.deleteOne({_id: req.params.id})
    .then( () => Department.updateOne({_id: req.body.departmentId}, 
        { $pull: {eventIds: req.params.id}}
    ))
    .then( () => {
        return res.json({ eventId: req.params.id})
    })

    
    
 

})

router.patch('/:id', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {isValid, errors} =  validateEventInput(req.body);
        if (!isValid){
            return res.status(400).json(errors);
        }
        const adminPrivilege = req.user.admin ? req.body.approved : false;
        const updatedEvent = {
            _id: req.body._id,
            title: req.body.title,
            description: req.body.description,
            creatorId: req.user.id,
            extras: req.body.extras,
            date: req.body.date,
            approved: adminPrivilege
        }; 
        Event.updateOne({_id: req.body._id}, {$set: updatedEvent}, {new: true})
        .then( () => res.json(updatedEvent))
    }
)


module.exports = router;




// "5e275b0e9d57ce35d1b6b142",
// "5e275b0f9d57ce35d1b6b143",
// "5e2b6eeab011843bd2b1143b",
// "5e2b6efcb011843bd2b1143c",
// "5e2b6f07b011843bd2b1143d",
// "5e2b6f18b011843bd2b1143e",
// "5e2b70ceb011843bd2b1143f",
// "5e3c8321aef20709e4fa84b6",
// "5e3c8417aef20709e4fa84b7",
// "5e3f91b1d090cb0805a24510",
// "5e3f91d521b95309eefc625a",
// "5e410f93270bf306aab8041d"