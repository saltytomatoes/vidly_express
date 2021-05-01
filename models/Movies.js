const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./Genres');


const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },

    genre: {
        type: genreSchema,
        required: true,
    },

    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});


// modeling the schema
const Movie = mongoose.model('Movie',movieSchema);



//validating input using joi
function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(3).max(255),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required().min(0).max(255),
        dailyRentalRate: Joi.number().required().min(0).max(255)
    }

    return Joi.validate(movie, schema);
}



module.exports.Movie = Movie;
module.exports.validate = validateMovie;