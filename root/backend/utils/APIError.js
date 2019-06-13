const url = require('url');
const {ACCESS_TOKEN} = require('../utils/constants');

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

        if (!type && status) type = 'about:blank';
        if (!title && status) title = statusCodes[status];
        if (instance) url.parse(instance);
        if (type) url.parse(type);

        this.response = {
            title,
            type,
            code,
            detail,
            invalid_params,
            instance,
        }
        this.status = status;
        this.clearTokenCookie = false;
    }

    sendToRes(res) {
        if(this.clearTokenCookie) res.clearCookie(ACCESS_TOKEN);
        res.status(this.status).send({ error: this.response })
    }

    setStatus(status) {
        this.status = status;
    }
}

class InvalidTokenError extends APIError {
    constructor(options={}){
        super(400, {
            title: 'Invalid token',
            detail: 'Could not decode token.',
            code: 1001,
            ...options
        })
        this.clearTokenCookie = true;
    }
}

class AccountNotFoundError extends APIError {
    constructor(options={}){
        super(404, {
            title: 'Invalid account',
            detail: 'Could not find account.',
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

class UserNotFoundError extends APIError {
    constructor(options={}){
        super(404, {
            title: 'Invalid user',
            detail: 'Could not find user.',
            code: 1005,
            ...options
        })
    }
}

class UnauthorizedError extends APIError {
    constructor(options={}){
        super(401, {
            title: 'Unauthorized request',
            detail: 'Not authorized to perform this request.',
            code: 1006,
            ...options
        })
    }
}

class DatabaseError extends APIError {
    constructor(options={}){
        super(400, {
            title: 'Database error',
            detail: 'There was an error performing this action on the database.',
            code: 1007,
            ...options
        })
    }
}

class NoTokenError extends APIError {
    constructor(options={}){
        super(401, {
            title: 'No login token found',
            detail: 'Login token not found. Please log in to perform this request.',
            code: 1008,
            ...options
        })
    }
}

module.exports = {
    APIError,
    InvalidTokenError,
    AccountNotFoundError,
    InvalidUsernameOrPasswordError,
    InvalidParametersError,
    UserNotFoundError,
    UnauthorizedError,
    DatabaseError,
    NoTokenError,
}
