const APIError = require('../utils/APIError')

// handles sequelize MySQL errors
function convertSchemaError(err) {

    let details = []
    let params = []
    var error = null
    switch(err.name){
        case 'ValidationError':
            for (var i in err.errors){
                details.push(err.errors[i].details)
            }
            return new APIError(400, {
                title: 'Input validation constraints error',
                detail: 'The following messages for the violating fields are outputted below:\n' + details.join('\n')
            })
        case 'UniqueConstraintError':
            for (var i in err.errors){
                params.push(err.errors[i].param)
            }
            return new APIError(409, {
                title: 'Unique constraint error',
                detail: 'The inputs for the following fields must be unique: ' + params.join(", ")
            })
        case 'NotNullConstraintError':
            for (var i in err.errors){
                params.push(err.errors[i].param)
            }
            return new APIError(400, {
                title: 'Not null constraint error',
                detail: 'The inputs for the following fields are required: ' + params.join(", ")
            })
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
        title: 'Unhandled Internal Server Error',
        detail: 'Server did not handle thrown error: ' + err.name,
    }).sendToRes(res);
}

module.exports = {
    convertSchemaError,
    schemaErrorHandler,
    defaultErrorHandler,
}
