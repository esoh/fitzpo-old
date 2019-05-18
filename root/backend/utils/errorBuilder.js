const url = require('url')

// TODO: Allow invalid_params with param and reason fields

class APIError {
    /**
    *
    * @param {Object} options
    * @param {Number} [options.status]
    *   HTTP Status code
    * @param {String} [options.title]
    *   A short, human-readable title for the general error type;
    *   the title should not change for given types.
    * @param {String} [options.type]
    *   a URL to a document describing the error condition
    *   (optional, and "about:blank" is assumed if none is provided;
    *   should resolve to a human-readable document).
    *   e.g. (https://example.net/validation-error)
    * @param {String} [options.detail]
    *   A human-readable description of the specific error.
    * @param {String} [options.instance]
    *   This optional key may be present, with a unique URI for the specific error;
    *   this will often point to an error log for that specific response.
    */

    constructor(options){
        const detail = options.detail
        const instance = options.instance
        let type = options.type
        let title = options.title
        const status = options.status

        const statusCodes = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            409: 'Conflict',
            500: 'Internal Server Error',
        }

        if (status && !type) {
            type = 'about:blank'
        }

        if (status && type === 'about:blank') {
            title = statusCodes[status]
        }

        if (instance) {
            url.parse(instance)
        }

        if (type) {
            url.parse(type)
        }

        const result = {
            type,
            title,
            detail,
            instance,
        }

        return {error: result}
    }
}

module.exports = {APIError}
