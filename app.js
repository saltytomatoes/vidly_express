const express = require('express');
const app = express();
const port = process.env.port || 3000;


/* connecting to mongodb */
const mongoose = require('mongoose');
const DB_NAME = 'vidly';
mongoose.connect(`mongodb://localhost/${DB_NAME}`)
  .then(  () => console.log('Connected to mongo!') )
  .catch( err => console.log('Error!', err.message ) );



app.use(express.json()); //allows the app to accept json requests.


const genres = require('./routes/genres');
app.use('/api/genres', genres);

const customers = require('./routes/customers');
app.use('/api/customers', customers);


app.listen(port, () => { console.log(`The server is listening on port ${port}...`) });