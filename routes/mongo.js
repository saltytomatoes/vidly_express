const mongoose = require('mongoose');
const DB_NAME = 'vidly';


mongoose.connect(`mongodb://localhost/${DB_NAME}`)
  .then(  () => console.log('Connected to mongo!') )
  .catch( err => console.log('Error!', err.message ) );


const movieSchema = mongoose.Schema({
    name: {type: String, required: true},
    genre: {type: String, required: true},
});

const Movie = mongoose.model('Movie',movieSchema);


// functions exported
const db = {
    
    getAll: async function() {
        return await Movie.find();
    },

    getById: async function(id) {
        return await Movie.find({_id: id});
    },

    update: async function(id, body) {
        const movie = await Movie.findByIdAndUpdate(id,{
            name: body.name,
            genre: body.genre
        }, { new: true });

        return movie;
    },

    delete: async function(id) {
        return await Movie.deleteOne({_id: id});
    },

    add: async function(obj) {
        const newMovie = new Movie({
            name: obj.name,
            genre: obj.genre
        });

        return await newMovie.save();
    }


}

module.exports = db;