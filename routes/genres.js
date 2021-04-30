const express = require('express');
const Joi = require('joi');
const db = require('./mongo');
const router = express.Router();




// let data = [{ id:0, name: "fast and furious", genre: "action"},
//             { id:1, name: "the minions", genre: "kids"},
//             { id:2, name: "jumanji", genre: "comedy"}];
            

//get all movies
router.get('/all', async (req , res) => {
    const allMovies = await db.getAll();
    res.send( allMovies );
});




//get specific movie.
router.get('/:id', async (req , res) => {
    const movie = await db.getById( req.params.id );

    if(!movie) return res.status(404).send(`sorry! there is no movie with corresponding id: ${req.params.id}`);

    res.send( movie );
});


// add new movie to the list
router.post("/post", (req , res) => {

    const { error } = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newMovie = { name: req.body.name, genre: req.body.genre };
    db.add(newMovie);
    res.send(newMovie);
});





//update an existing movie from the list 
router.put('/update/:id', async(req , res) => {
    
    const { error } = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const movie = await db.update(req.params.id, req.body);
    if(!movie) return res.status(404).send(`sorry! there is no movie with corresponding id: ${req.params.id}`);

    res.send(movie);
});

router.delete('/delete/:id', async (req, res) => {

    let movie = await db.delete(req.params.id);
    if(!movie) return res.status(404).send(`sorry! there is no movie with corresponding id: ${req.params.id}`);

    res.send(movie);
});



const validateInput = (movie) => {
    const schema = {
        name: Joi.string().required(),
        genre: Joi.string().required()
    }

    return Joi.validate(movie, schema);
}

module.exports = router;

