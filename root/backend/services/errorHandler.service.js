const APIError = require('../utils/errorBuilder').APIError

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
            return new APIError({
                title: 'Input validation constraints error',
                detail: 'The following messages for the violating fields are outputted below:\n' + details.join('\n')
            })
        case 'UniqueConstraintError':
            for (var i in err.errors){
                params.push(err.errors[i].param)
            }
            return new APIError({
                title: 'Unique constraint error',
                detail: 'The inputs for the following fields must be unique: ' + params.join(", ")
            })
        case 'NotNullConstraintError':
            for (var i in err.errors){
                params.push(err.errors[i].param)
            }
            return new APIError({
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

    if(schemaErr.error.title == 'Unique constraint error'){
        return res.status(409).send(schemaErr);
    }

    return res.status(400).send(schemaErr);
}

function defaultErrorHandler(err, req, res, next){
    console.error('============== START ERROR STACK TRACE ==============')
    console.error(err.stack)
    console.error('============== END ERROR STACK TRACE ==============')
    res.status(500).send(new APIError({
        title: 'Unhandled Internal Server Error',
        detail: 'Server did not handle thrown error: ' + err.name,
        status: 500
    }))
    res.status(500).send(error)
}

module.exports = {
    convertSchemaError,
    schemaErrorHandler,
    defaultErrorHandler,
}
