const express = require('express');
const app = express();

const port = process.env.port || 3000;


app.use(express.json()); //allows the app to accept json requests.


const genres = require('./routes/genres');
app.use('/api', genres);



app.listen(port, () => { console.log(`The server is listening on port ${port}...`) });