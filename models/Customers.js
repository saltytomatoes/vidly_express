const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
});

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer (customer) {
    const schema = {
        name: Joi.string().required().min(3).max(255),
        isGold: Joi.boolean(),
        phone: Joi.string().required().min(10).max(10)
    }

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;