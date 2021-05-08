const winston = require('winston');

function handleEx(err, req, res, next){
    winston.error(err.message, err);
    res.status(500).send('Something failed.');
}


function tryCatch(handler) {
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }
        catch(exeption) {
            next(exeption);
        }
    };
}



module.exports.tryCatch = tryCatch;
module.exports.handleEx = handleEx;