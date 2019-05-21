const Sequelize = require('sequelize')

const VALIDATION_ERROR = 'ValidationError';
const UNIQUE_ERROR = 'UniqueConstraintError';
const NOT_NULL_ERROR = 'NotNullConstraintError';

const sequelizeErrorTypes = {
    'Validation error': VALIDATION_ERROR,
    'unique violation': UNIQUE_ERROR,
    'notNull Violation': NOT_NULL_ERROR,
}

class SchemaParamError {
    constructor(error){
        this.error = sequelizeErrorTypes[error.type];
        this.param = error.path;
        this.details = error.message;
        if(!this.error){
            console.error("SEQUELIZE ERROR NOT FOUND: " + err.type)
            return null;
        }
    }
}

class SchemaError {
    constructor(err) {
        if(!(err instanceof Sequelize.ValidationError)) return null;

        this.errors = [];
        this.name = sequelizeErrorTypes[err.errors[0].type];

        for (var i in err.errors){
            let schemaParamError = new SchemaParamError(err.errors[i]);
            this.errors.push(schemaParamError)
            if(this.name != sequelizeErrorTypes[err.errors[i].type]){
                this.name = VALIDATION_ERROR
            }
        }

    }
}

module.exports = {
    SchemaError,
    VALIDATION_ERROR,
    UNIQUE_ERROR,
    NOT_NULL_ERROR,
}
