const express = require('express');
const router = express.Router();
const Department = require('../../models/Department');
const Event = require('../../models/Event');

const passport = require('passport');
const validateDepartmentInput = require('../../validation/departments/departments');
// const mongoose = require('mongoose')



router.get('/', (req, res) => {
    Department.find()
    .then( departments => {
        if (!departments){
            return res.status(404).json({ department: 'there are no departments '})
        }



        res.json(departments)        
    })
})

router.get('/:id/', (req, res) => {
    // Event.find( {departmentId: req.params.id} )
    // .then( events => {
    //     const eventIds = events.map( event => {
    //         return event.id
    //     });
    //     Department.findById(req.params.id)
    //     .then( dep => res.json(Object.assign(dep,{eventIds})))
    // })

    Department.findById(req.params.id)
        .then( dep => res.json(dep))


})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {isValid, errors} =  validateDepartmentInput(req.body);
        if (!isValid){
            return res.status(400).json(errors);
        }
        const newDepartment = new Department({
            name: req.body.name,
            organizationId: req.body.organizationId
            // organizationId: 2

        });     
        newDepartment.save().then ( Department => res.json(Department))
    }
)

router.delete('/:id', (req, res) => {
    passport.authenticate('jwt', {session: false}),
    Department.deleteOne({_id: req.params.id})
    .then( () => res.json({ msg: 'Delete Successful'}))

})

module.exports = router;
