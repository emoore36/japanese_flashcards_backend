class NotFoundError extends Error {

    constructor(message, options) {
        super(message, options);
    }

}

module.exports = NotFoundError;