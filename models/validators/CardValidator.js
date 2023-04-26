class CardValidator {

    static validate = (card) => {

        // data validation
        const front_text = card.front_text?.trim() || '';
        const back_text = card.back_text?.trim() || '';
        const deck_id = Number(card.deck_id) || 0;

        // for each validation error, add to the list
        let validationErrors = [];

        // validate front_text
        if (!front_text) {
            validationErrors = [...validationErrors, '[front_text] is a required string and cannot be blank.'];
        }

        // validate back_text
        if (!back_text) {
            validationErrors = [...validationErrors, '[back_text] is a required string and cannot be blank.'];
        }

        // validate deck_id
        if (!Number.isInteger(deck_id)) {
            validationErrors = [...validationErrors, '[deck_id] must be an integer.'];
        }
        if (deck_id <= 0) {
            validationErrors = [...validationErrors, '[deck_id] must be positive.'];
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

module.exports = CardValidator;