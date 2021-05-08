const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Genre, validate} = require('../models/Genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { tryCatch } = require('../middleware/errorHandling');


// get all genres.
router.get('/', tryCatch(async (req, res) => {

    const genres = await Genre.find().sort('name');
    
    res.send(genres);
}));
/* handle error takes an anonimous function and
returns a new callback function that wraps the code with a
try catch block, this could be done automaticaly
without an error handler wrapper by the
express-async-errors npm module  */









// get a specific genre
router.get('/:id', async (req , res) => {
    const genre = await Genre.findById( req.params.id );

    if(!genre) return res.status(404).send(`There is no ${req.params.id} genre, sorry.`);
    
    res.send(genre);
});


// add new genre
router.post('/', auth, async (req, res) => {

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name: req.body.name});
    genre = await genre.save();

    res.send(genre);
});


router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });

    if(!genre) return res.status(404).send(`There is no ${req.params.id} genre, sorry.`);

    res.send(genre);
});


router.delete('/:id',[auth, admin], async (req , res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send(`There is no ${req.params.id} genre, sorry.`);
    
    res.send(genre);
});


module.exports = router;