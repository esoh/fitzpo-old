const {APIError} = require('../utils/APIError');
const SchemaError = require('../utils/SchemaError');

function schemaErrorHandler(err, req, res, next){
    if(err instanceof SchemaError){
        return err.toAPIError().sendToRes(res);
    }
    return next(err);
}

function defaultErrorHandler(err, req, res, next){

    console.error('============== START ERROR STACK TRACE ==============')
    console.error(err.stack)
    console.error('============== END ERROR STACK TRACE ==============')

    new APIError(500, {
        detail: 'Server did not handle thrown error: ' + err.name,
    }).sendToRes(res);
}

module.exports = {
    schemaErrorHandler,
    defaultErrorHandler,
}
