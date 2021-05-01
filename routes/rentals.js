const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/Rentals');
const { Customer } = require('../models/Customers');
const { Movie } = require('../models/Movies');
const Fawn = require('fawn');

Fawn.init(mongoose);



router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});



router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send(`There is no ${req.params.id} rental, sorry.`);

    res.send(rental);
});



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('invalid movie');

    if (movie.numberInStock === 0) return res.status(400).send('sorry movie not in stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: {
                    numberInStock: -1
                }
            })
            .run();

        res.send(rental);
    } catch (ex) {
        res.status(500).send('something failed...')
    }
});

module.exports = router;