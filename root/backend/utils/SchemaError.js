const Sequelize = require('sequelize');

const {InvalidParametersError} = require('../utils/APIError');

const UNIQUE_VALIDATOR_ERROR = 'UniqueValidatorError';
const validatorTypes = {
    'is': {
        error: 'CustomValidatorError',
        message: 'Value does not follow custom constraints'
    },
    'isEmail': {
        error: 'EmailValidatorError',
        message: 'Value is not an email'
    },
    'not_unique': {
        error: UNIQUE_VALIDATOR_ERROR,
        message: 'Value must be unique'
    },
    'is_null': {
        error: 'NotNullValidatorError',
        message: 'Value must not be null'
    },
    'isNotProfane': {
        error: 'ProfanityValidatorError',
        message: 'Profanity is not allowed'
    }
}

class SchemaParamError {
    constructor(error){
        if(!error.validatorKey) throw Error('Not a schema validator error with a validatorkey:' + error)
        const validatorError = validatorTypes[error.validatorKey];
        if(!validatorError) throw Error('Sequelize error not found?? ' + error.validatorKey)

        this.param = error.path;
        this.error = validatorError.error;
        this.details = validatorError.message;
    }
}

class SchemaError {
    constructor(err) {
        if(!(err instanceof Sequelize.ValidationError)) return null;
        this.name = 'ValidationError'
        this.errors = err.errors.map(subErr => new SchemaParamError(subErr));
    }

    combineUsernameEmailNotUnique() {
        // see if username not unique or email not unique is an error
        var usernameOrEmailUniqueError = this.errors.some(paramErr => {
            return (paramErr.param == 'username' ||
                    paramErr.param == 'email') &&
                   paramErr.error == UNIQUE_VALIDATOR_ERROR;
        })
        if(!usernameOrEmailUniqueError) return;

        this.errors = this.errors.filter(paramErr => {
            return !((paramErr.param == 'username' ||
                      paramErr.param == 'email') &&
                     paramErr.error == UNIQUE_VALIDATOR_ERROR);
        })
        this.errors.push(new SchemaParamError({
            validatorKey: 'not_unique',
            path: 'usernameOrEmail'
        }))
    }

    toAPIError() {
        var invalid_params = this.errors.map(subErr => {
            return {
                name: subErr.param,
                reason: subErr.details,
                error: subErr.error,
            }
        })

        return new InvalidParametersError({ invalid_params })
    }
}

module.exports = SchemaError;
