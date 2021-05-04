const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validate} = require('../models/Users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');





router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let userExists = await User.findOne({email: req.body.email});
    if(userExists) return res.status(400).send('User allready registered!');

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    // OR    let newUser = new User( _.pick(req.body, ['name','email','password']) );
    
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    
    const token = jwt.sign({_id: newUser._id}, config.get('jwtPrivateKey'));
    res.header('x-auth-token',token).send(_.pick(newUser, ['name','email','_id']) );
});

module.exports = router;