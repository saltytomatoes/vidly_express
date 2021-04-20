const express = require('express');
const Joi = require('joi');


const app = express();
const port = process.env.port || 3000;


// initial list of movies.
let data = [{ id:0, name: "fast and furious", genre: "action"},
            { id:1, name: "the minions", genre: "kids"},
            { id:2, name: "jumanji", genre: "comedy"}];


app.get('/api/all', (req , res) => {
    res.send(data);
});

app.get('/api/:id', (req , res) => {
    let movie = data.find( movie => movie.id === +req.params.id);

    if(!movie) {
       res.status(404).send(`sorry! there is no movie with corresponding id: ${req.params.id}`);
       return; 
    }

    res.send(movie);
});




app.listen(port, () => { console.log(`The server is listening on port ${port}...`) });