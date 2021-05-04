const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/Users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');




router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let userExists = await User.findOne({email: req.body.email});
    if(!userExists) return res.status(400).send('Invalid email or password');

    const valid = await bcrypt.compare(req.body.password, userExists.password);
    if(!valid) return res.status(400).send('Invalid email or password');
    
    const token = userExists.generateAuthToken();

    res.send(token);
});



function validate(req) {
    const schema = {
        email: Joi.string().required().min(3).max(255).email(),
        password: Joi.string().required().min(5).max(1024)
    }

    return Joi.validate(req, schema);
}


module.exports = router;