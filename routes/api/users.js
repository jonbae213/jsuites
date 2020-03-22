const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Event = require('../../models/Event');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys_prod');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const validLoginInput = require('../../validation/users/login');
const validRegisterInput = require('../../validation/users/register')

router.get('/test', (req, res) => {
    res.json({ msg: "this is the user route"});

});

router.get('/current', passport.authenticate('jwt', {session: false}),(req, res) => {
    
    
    Event.find( {departmentId: req.user.departmentId} )
        .then( events => {
            const eventIds = events.map( event => {
                return event.id
            })

            res.json({
                id: req.user.id,
                email: req.user.email,
                admin: req.user.admin,
                eventIds: eventIds
            });
        });
});

router.get('/', (req, res) => {
    User.find()
    .then( Users => {
        if (!Users || Users.length === 0){
            return res.status(404).json({ User: 'there are no Users '})
        }
        res.json(Users)
    })
})

router.post('/register', (req, res) => {
    const {errors, isValid} = validRegisterInput(req.body)
    if (!isValid) return res.status(400).json(errors);

    User.findOne({ email: req.body.email })
    .then(user => {
        if (user){
            return res.status(400).json({email: 'Email already exists'})
        } else {

            const newUser = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                admin: req.body.admin,
                password: req.body.password,
                departmentId: '5e0f748ad405b413b11916d0'
            });

            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                    // if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then( user => res.json(user))
                        .catch( err => console.log(err))
                })
            })
        }
    })
})


router.post('/login', (req, res) => {
    const {errors, isValid} = validLoginInput(req.body)
    if (!isValid) return res.status(400).json(errors)

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if (!user){
            return res.status(404).json({ email: "this user does not exist"})
        }

        bcrypt.compare(password, user.password)
            .then( isMatch => {
                if (isMatch){
                    const payload = { currentUserid: user.id, name: user.firstName, admin: user.admin, deptId: user.departmentId }
                    
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600},
                        (err, token)  => {
                            res.json({ 
                                payload,
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                    )
                } else {
                    return res.status(400).json( {password: "Incorrect password"})
                }
            })
    })
})

module.exports = router;