const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('config');

/* importing routers */
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


/* connecting to mongodb */
const DB_NAME = 'vidly';
mongoose.connect(`mongodb://localhost/${DB_NAME}`)
.then(  () => console.log('Connected to mongo!') )
.catch( err => console.log('Error!', err.message ) );



app.use(express.json()); //allows the app to accept json requests.
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.port || 3000;
app.listen(port, () => { console.log(`The server is listening on port ${port}...`) });






// _id: 608d41ac d1535e 1ca4 ed0f6f

// 12 bytes
// 4 - timestamp
// 3 - machine identifier
// 2 - process identifier
// 3 - counter

// Driver -> mongoDB




//const id = mongoose.Types.objectId();
//id.getTimeStamp();