const express = require('express');


const app = express();
const Joi = require('joi');
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



app.post("/api/post", (req , res) => {

    const { error } = validateInput(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    data.push(req.body);
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