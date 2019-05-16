// Turns Sequelize errors into generic model errors
const Sequelize = require('sequelize')

module.exports = (err) => {
    if(!(err instanceof Sequelize.ValidationError)) return err

    var errors = []

    const sequelizeErrorTypes = {
        'Validation error': 'ValidationError',
        'unique violation': 'UniqueConstraintError',
        'notNull Violation': 'NotNullConstraintError'
    }

    var errorType = sequelizeErrorTypes[err.errors[0].type]

    for (var i in err.errors){
        let basicErr = {
            error: sequelizeErrorTypes[err.errors[i].type],
            param: err.errors[i].path,
            details: err.errors[i].message
        }
        if(!basicErr.error) console.error("SEQUELIZE ERROR NOT FOUND: " + err.errors[i].type)
        errors.push(basicErr)
        if(errorType != sequelizeErrorTypes[err.errors[i].type]){
            errorType = 'ValidationError'
        }
    }

    const error = {
        name: errorType,
        errors: errors
    }

    return error
}
