const { InvalidParametersError,
        APIError } = require('../utils/APIError');
const SchemaError = require('../utils/SchemaError');

// handles sequelize MySQL errors
function convertSchemaErrorToAPIError(err) {
    if(!(err instanceof SchemaError)) return null;

    var invalid_params = err.errors.map(subErr => {
        return {
            name: subErr.param,
            reason: subErr.details,
            error: subErr.error,
        }
    })

    return new InvalidParametersError({ invalid_params: invalid_params })
}

function schemaErrorHandler(err, req, res, next){
    let schemaErr = new convertSchemaErrorToAPIError(err);
    if(!schemaErr) return next(err);

    return schemaErr.sendToRes(res);
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
    convertSchemaErrorToAPIError,
    schemaErrorHandler,
    defaultErrorHandler,
}
