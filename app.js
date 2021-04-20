const express = require('express');
const Joi = require('joi');


const app = express();
const port = process.env.port || 3000;


// initial list of movies.
let data = [{ id:0, name: "fast and furious", genre: "action"},
            { id:1, name: "the minions", genre: "kids"},
            { id:2, name: "jumanji", genre: "comedy"}];

app.get('/', (req , res) => {
    res.send(data);
});





app.listen(port, () => { console.log(`The server is listening on port ${port}...`) });