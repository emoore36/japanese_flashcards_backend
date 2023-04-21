const NotFoundError = require("../../errors/NotFoundError");
const DatabaseError = require("../../errors/DatabaseError");
const DatabaseConnector = require("../DatabaseConnector");
const CardEntity = require('../entities/CardEntity');

class CardDataService {

    #db = DatabaseConnector.getConn();

    #logEntry = (methodName, paramData = 'N/A') => {
        console.log(`Entering CardDataService ${methodName}() with data:`, paramData);
    };

    #logExit = (methodName, resultData) => {
        console.log(`Leaving CardDataService ${methodName}() with result:`, resultData);
    }

    /**
     * Adds a given card to the database.
     * @param {Card} card the card to persist
     * @returns the id of the persisted card
     */
    create = async (card) => {

        this.#logEntry('create', card);

        const id = await this.#db.one(
            'INSERT INTO card_table (front_text, back_text, deck_id) VALUES ($1, $2, $3) RETURNING id',
            [card.front_text, card.back_text, card.deck_id]
        ).then((result) => {
            return result.id;
        }).catch((err) => {

            if (err.message.includes('foreign key constraint')) {
                throw new NotFoundError(`Deck not found at deck_id = ${card.deck_id}.`);
            }

            console.log(err);
            throw new DatabaseError(err);
        });

        this.#logExit('create', id);
        return id;

    };

    /**
     * Retrieves a card from the database where associated with the given ID.
     * @param {Number} id the card ID 
     * @returns {Card} the card
     */
    readOne = async (id) => {

        this.#logEntry('readOne', id);

        const result = await this.#db.one(
            'SELECT * FROM card_table WHERE id = $1',
            [id]
        ).then((result) => {
            return result;
        }).catch((err) => {

            if (err.name === "QueryResultError") {
                return null;
            }

            console.log(err);
            throw err;
        });

        this.#logExit('readOne', result);
        return result;
    };

    readAllbyDeckId = async (deck_id) => {

        this.#logEntry('readAllByDeckId', deck_id);

        const result = await this.#db.any(
            'SELECT * FROM card_table WHERE deck_id = $1',
            [deck_id]
        ).then((result) => {
            this.#logExit('readAllByDeckId', result);
            return result;
        }).catch((err) => {

            if (err.name === "QueryResultError") {
                return null;
            }

            console.log(err);
            throw err;
        });

        this.#logExit('readAllByDeckId', result.length);
        return result;

    };

    readAll = async () => {

        this.#logEntry('readAll')

        const result = await this.#db.any(
            'SELECT * FROM card_table'
        ).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
            throw err;
        });

        this.#logExit('readAll', result.length);
        return result;

    }

    /**
     * 
     * @param {CardEntity} card the card to update 
     * @returns 
     */
    update = async (card) => {

        this.#logEntry('update', card);

        const result = await this.#db.any(
            'UPDATE card_table SET front_text = $1, back_text = $2, deck_id = $3 WHERE id = $4',
            [card.front_text, card.back_text, card.deck_id, card.id]
        ).then((result) => {
            return result.id;
        }).catch((err) => {

            console.log(err);
            throw err;
        });

        this.#logExit('update', result);
        return result;

    }

    delete = async (id) => {
        this.#logEntry('delete', id);

        const result = await this.#db.none(
            'DELETE FROM card_table WHERE id = $1',
            [id]
        ).then((result) => {
            return 1;
        }).catch((err) => {
            console.log(err);
            throw err;
        });

        this.#logExit('delete', result);
        return result;

    };

}

module.exports = CardDataService;