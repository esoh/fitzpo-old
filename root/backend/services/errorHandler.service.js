const { InvalidParametersError,
        ParametersNotUniqueError,
        NullParametersError,
        APIError } = require('../utils/APIError');
const { VALIDATION_ERROR,
        UNIQUE_ERROR,
        NOT_NULL_ERROR } = require('../utils/SchemaError');

// handles sequelize MySQL errors
function convertSchemaError(err) {

    var invalid_params = []
    for(var i in err.errors){
        invalid_params.push({
            name: err.errors[i].param,
            reason: err.errors[i].details
        })
    }

    switch(err.name){
        case VALIDATION_ERROR:
            return new InvalidParametersError({ invalid_params: invalid_params })
        case UNIQUE_ERROR:
            return new ParametersNotUniqueError({ invalid_params: invalid_params })
        case NOT_NULL_ERROR:
            return new NullParametersError({ invalid_params: invalid_params })
        default:
            return null
    }
}

function schemaErrorHandler(err, req, res, next){
    let schemaErr = convertSchemaError(err);
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
    convertSchemaError,
    schemaErrorHandler,
    defaultErrorHandler,
}
