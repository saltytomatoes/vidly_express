const DB_NAME = 'vidly';
const express = require('express');
const app = express();
const winston = require('winston');



//importing logging logic
require('./startup/logging')(DB_NAME);

//importing routers
require('./startup/routes')(app);

const { handleEx } = require('./middleware/errorHandling');
app.use( handleEx );


//db initialization
require('./startup/db')(DB_NAME);

require('./startup/config')();

 
const port = process.env.port || 3000;
app.listen(port, () => { winston.info(`The server is listening on port ${port}...`) });
