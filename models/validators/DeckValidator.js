class DeckValidator {

    static validate = (deck) => {

        // data validation
        const name = deck.name?.trim() || '';

        // for each validation error, add to the list
        let validationErrors = [];

        // validate front_text
        if (!name) {
            validationErrors = [...validationErrors, '[name] is a required string and cannot be blank.'];
        }
        if (name.length > 60) {
            validationErrors = [...validationErrors, '[name] should be at most 60 characters in length.'];
        }

        return {
            numOfErrors: validationErrors.length,
            errorsList: validationErrors,
            hasErrors: (validationErrors.length > 0),
            includeId: (id) => {
                id = Number(id) || 0;

                // validate id
                if (!id) {
                    validationErrors = [...validationErrors, '[id] is required.'];
                }
                if (!Number.isInteger(id)) {
                    validationErrors = [...validationErrors, '[id] must be an integer.'];
                }
                if (id <= 0) {
                    validationErrors = [...validationErrors, '[id] must be positive.'];
                }

                return {
                    numOfErrors: validationErrors.length,
                    errorsList: validationErrors,
                    hasErrors: (validationErrors.length > 0)
                }

            }
        }

    }

}

module.exports = DeckValidator;