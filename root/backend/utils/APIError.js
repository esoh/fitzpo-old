const url = require('url')

class APIError {
    /**
    *
    * @param {Number} [options.status]
    *   HTTP Status code
    * @param {Object} options
    *   @param {String} [options.title]
    *     A short, human-readable title for the general error type;
    *     the title should not change for given types.
    *   @param {Number} [options.code]
    *     An app-defined global code identifier for the error
    *   @param {String} [options.type]
    *     a URL to a document describing the error condition
    *     (optional, and "about:blank" is assumed if none is provided;
    *     should resolve to a human-readable document).
    *     e.g. (https://example.net/validation-error)
    *   @param {String} [options.detail]
    *     A human-readable description of the specific error.
    *   @param {List} [options.invalid_params]
    *     contains invalid parameter objects
    *     @param {Object} [options.invalid_params[i]]
    *       invalid parameter
    *       @param {String} [options.invalid_params[i].name]
    *           name of invalid parameter
    *       @param {String} [options.invalid_params[i].reason]
    *           reason of invalidation
    *   @param {String} [options.instance]
    *     This optional key may be present, with a unique URI for the specific error;
    *     this will often point to an error log for that specific response.
    */

    constructor(status, options){
        let title = options.title
        let type = options.type
        const code = options.code
        const detail = options.detail
        let invalid_params = options.invalid_params
        const instance = options.instance

        const statusCodes = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            409: 'Conflict',
            500: 'Internal Server Error',
        }

        if (!type && status) {
            type = 'about:blank'
        }

        if (!title && status) {
            title = statusCodes[status]
        }

        if (instance) {
            url.parse(instance)
        }

        if (type) {
            url.parse(type)
        }

        this.response = {
            title,
            type,
            code,
            detail,
            invalid_params,
            instance,
        }

        this.status = status;
    }

    sendToRes(res) {
        res.status(this.status).send({ error: this.response })
    }

    setStatus(status) {
        this.status = status;
    }
}

class UsernameOrEmailNotUniqueError extends APIError {
    constructor(options={}){
        super(409, {
            title: 'Username and/or email taken',
            detail: 'Username and/or email already in use.',
            code: 1000,
            ...options
        })
    }
}

class InvalidTokenError extends APIError {
    constructor(options={}){
        super(400, {
            title: 'Invalid token',
            detail: 'Could not decode token',
            code: 1001,
            ...options
        })
    }
}

class AccountNotFoundError extends APIError {
    constructor(options={}){
        super(404, {
            title: 'Invalid account',
            detail: 'Could not find account',
            code: 1002,
            ...options
        })
    }
}

class InvalidUsernameOrPasswordError extends APIError {
    constructor(options={}){
        super(400, {
            title: 'Invalid credentials',
            detail: 'Username and/or password are incorrect.',
            code: 1003,
            ...options
        })
    }
}

class InvalidParametersError extends APIError {
    constructor(options={}){
        super(400, {
            title: 'Input validation constraints error',
            detail: 'Input violates certain conditions.',
            code: 1004,
            ...options
        })
    }
}

class ParametersNotUniqueError extends InvalidParametersError {
    constructor(options={}){
        super({
            title: 'Unique constraint error',
            detail: 'Input parameters already exist in the database; they must be unique.',
            code: 1005,
            ...options
        })
        this.status = 409;
    }
}

class NullParametersError extends InvalidParametersError {
    constructor(options={}){
        super({
            title: 'Not null constraint error',
            detail: 'Input parameters are missing and must not be null.',
            code: 1006,
            ...options
        })
    }
}

module.exports = {
    APIError,
    UsernameOrEmailNotUniqueError,
    InvalidTokenError,
    AccountNotFoundError,
    InvalidUsernameOrPasswordError,
    InvalidParametersError,
    ParametersNotUniqueError,
    NullParametersError,
}
