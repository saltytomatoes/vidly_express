const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const customerSchema = mongoose.Schema({
    name: {type: String, required: true},
    isGold: {type: Boolean, default: false},
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10
    }
});

const Customer = mongoose.model('Customer', customerSchema);



router.get('/all', async (req , res) => {
    const customer = await Customer.find();
    res.send(customer);
});




router.get('/:id', async (req, res) => {
    const customer = await Customer.find({_id: req.params.id });

    if(!customer) return res.status(404).send(`Sorry! there is no customer with id of ${req.params.id}`);
    res.send(customer);
});




router.post('/post', async (req, res) => {
    const { error } = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer(req.body);
    customer = await customer.save();
    res.send(customer);
});



router.put('/update/:id', async (req , res) => {

    const { error } = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(customer);
});


router.delete('/delete/:id', async (req, res) => {
    const deleted = await Customer.deleteOne({_id: req.params.id });
    res.send(deleted);
});


// joi validation
const validateInput = (customer) => {
    const schema = {
        name: Joi.string().required(),
        phone: Joi.string().required().min(10).max(10),
    }
    return Joi.validate(customer, schema);
}



module.exports = router;