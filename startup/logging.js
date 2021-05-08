const winston = require('winston');
require('winston-mongodb');
require('express-async-errors'); //automaticaly wraps the express route handlers with try catch


module.exports = function (DB_NAME) {
    // winston.handleExceptions(new winston.transports.File({
    //     filename: 'unhandledRejections.log'
    // }));


    /* handling async rejection outside the context of express */
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

       /* handling errors that occur outside the context of express
    but, this is sync code only! */
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
            process.exit(1);
    });


    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: `mongodb://localhost/${DB_NAME}`,
        level: 'info' //this means only info and above levels will be logged to the data base.
    });
}



   /* Logging levels
        error
        warn
        info
        verbose
        debug
        silly
    */