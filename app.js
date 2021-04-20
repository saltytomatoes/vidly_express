const express = require('express');


const app = express();
const Joi = require('joi');
const { valid } = require('joi/lib/types/object');
const port = process.env.port || 3000;


// initial list of movies.
let data = [{ id:0, name: "fast and furious", genre: "action"},
            { id:1, name: "the minions", genre: "kids"},
            { id:2, name: "jumanji", genre: "comedy"}];





app.use(express.json()); //allows the app to accept json requests.

//get all movies
app.get('/api/all', (req , res) => {
    res.send(data);
});


//get specific movie.
app.get('/api/:id', (req , res) => {
    let movie = data.find( movie => movie.id === +req.params.id);

    if(!movie) return res.status(404).send(`sorry! there is no movie with corresponding id: ${req.params.id}`);

    res.send(movie);
});


// add new movie to the list
app.post("/api/post", (req , res) => {

    const { error } = validateInput(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const newMovie = {id: data.length , name: req.body.name, genre: req.body.genre};
    data.push(newMovie);
    res.send(data);
    
});

//update an existing movie from the list 
app.put('/api/update/:id', (req , res) => {

    let movie = data.find( movie => movie.id === +req.params.id);
    if(!movie) return res.status(404).send(`sorry! there is no movie with corresponding id: ${req.params.id}`);

    const { error } = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    movie.name = req.body.name;
    movie.genre = req.body.genre;
    res.send(data);
});

app.delete('/api/delete/:id', (req, res) => {

    let movie = data.find( movie => movie.id === +req.params.id);
    if(!movie) return res.status(404).send(`sorry! there is no movie with corresponding id: ${req.params.id}`);

    let index = data.indexOf(movie);
    data.splice(index,1);

    res.send(data);
});



const validateInput = (movie) => {
    const schema = {
        name: Joi.string().required(),
        genre: Joi.string().required()
    }

    return Joi.validate(movie, schema);
}

app.listen(port, () => { console.log(`The server is listening on port ${port}...`) });