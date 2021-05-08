const Joi = require('joi');
const mongoose = require('mongoose');


const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
});


//modeling the genre schema
const Genre = mongoose.model('Genre', genreSchema);



// Joi validation
function validateGenre(genre) {
    const shcema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(genre, shcema);
}




module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;