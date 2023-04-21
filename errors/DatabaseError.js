class DatabaseError extends Error {

    constructor(message, options) {
        super(message, options);
    }

}

module.exports = DatabaseError;