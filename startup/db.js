const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function (DB_NAME) {

    /* connecting to mongodb */
    mongoose.connect(`mongodb://localhost/${DB_NAME}`)
        .then(() => winston.info(`Connected to mongoDB: ${DB_NAME}!`));
}



// _id: 608d41ac d1535e 1ca4 ed0f6f

// 12 bytes
// 4 - timestamp
// 3 - machine identifier
// 2 - process identifier
// 3 - counter

// Driver -> mongoDB




//const id = mongoose.Types.objectId();
//id.getTimeStamp();