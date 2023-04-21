const NotFoundError = require("../../errors/NotFoundError");
const DatabaseError = require("../../errors/DatabaseError");
const DatabaseConnector = require("../DatabaseConnector");
const CardEntity = require('../entities/CardEntity');

const { withLogging } = require('../../config/logMethod');

class CardDataService {

    #db = DatabaseConnector.getConn();

    /**
     * Adds a given card to the database.
     * @param {Card} card the card to persist
     * @returns the id of the persisted card
     */
    create = async (card) => {

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

        return id;

    };

    /**
     * Retrieves a card from the database where associated with the given ID.
     * @param {Number} id the card ID 
     * @returns {Card} the card
     */
    readOne = async (id) => {

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

        return result;
    };

    readAllbyDeckId = async (deck_id) => {


        const result = await this.#db.any(
            'SELECT * FROM card_table WHERE deck_id = $1',
            [deck_id]
        ).then((result) => {
            return result;
        }).catch((err) => {

            if (err.name === "QueryResultError") {
                return null;
            }

            console.log(err);
            throw err;
        });

        return result;

    };

    readAll = async () => {


        const result = await this.#db.any(
            'SELECT * FROM card_table'
        ).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
            throw err;
        });

        return result;

    }

    /**
     * 
     * @param {CardEntity} card the card to update 
     * @returns 
     */
    update = async (card) => {

        const result = await this.#db.any(
            'UPDATE card_table SET front_text = $1, back_text = $2, deck_id = $3 WHERE id = $4',
            [card.front_text, card.back_text, card.deck_id, card.id]
        ).then((result) => {
            return result.id;
        }).catch((err) => {

            console.log(err);
            throw err;
        });

        return result;

    }

    delete = async (id) => {

        const result = await this.#db.none(
            'DELETE FROM card_table WHERE id = $1',
            [id]
        ).then((result) => {
            return 1;
        }).catch((err) => {
            console.log(err);
            throw err;
        });

        return result;

    };

    create = withLogging(this.create, this.constructor.name);
    readOne = withLogging(this.readOne, this.constructor.name);
    readAllByDeckId = withLogging(this.readAllByDeckId, this.constructor.name);
    readAll = withLogging(this.readAll, this.constructor.name);
    update = withLogging(this.update, this.constructor.name);
    delete = withLogging(this.delete, this.constructor.name);

}

module.exports = CardDataService;