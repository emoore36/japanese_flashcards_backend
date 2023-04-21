const DatabaseConnector = require("../DatabaseConnector");
const DeckEntity = require('../entities/DeckEntity');

const { withLogging } = require('../../config/logMethod');

class DeckDataService {

    #db = DatabaseConnector.getConn();

    /**
     * Adds a Deck instance to the database.
     * @param {DeckEntity} deck the deck to persist.
     * @returns the ID of the persisted deck.
     */
    create = async (deck) => {

        const id = Number(await this.#db.one(
            'INSERT INTO deck_table (name) VALUES ($1) RETURNING id',
            [deck.name]
        ).then((result) => {
            return result.id;
        }).catch((err) => {
            throw err;
        }));

        return id;

    }

    /**
     * Retrieves from the database the deck associated with the given ID.
     * @param {Number} id the deck ID. 
     * @returns the deck.
     */
    readOne = async (id) => {

        const deck = await this.#db.one(
            'SELECT * FROM deck_table WHERE id = $1',
            [id]
        ).then((result) => {
            return result;
        }).catch((err) => {

            if (err.name === "QueryResultError") {
                return null;
            }

            throw err;

        });

        return deck;

    }

    /**
     * Retrieves all decks from the database.
     * @returns All the decks.
     */
    readAll = async () => {

        const decks = await this.#db.any('SELECT * FROM deck_table')
            .then((result) => {
                return result;
            }).catch((err) => {
                throw err;
            });

        return decks;

    }

    /**
     * Updates a deck instance in the database with the given deck parameter.
     * @param {DeckEntity} deck the given deck to update. 
     * @returns the number of rows affected.
     */
    update = async (deck) => {

        const result = await this.#db.none(
            'UPDATE deck_table SET name = $1 WHERE id = $2',
            [deck.name, deck.id])
            .then((result) => {
                return 1;
            }).catch((err) => {
                throw err;
            });

        return result;

    }

    /**
     * Removes the deck associated with the given ID.
     * @param {Number} id the ID of the deck to delete. 
     * @returns the number of rows affected.
     */
    delete = async (id) => {

        return await this.#db.none('DELETE FROM deck_table WHERE id = $1', [id])
            .then((result) => {
                return 1; // success
            }).catch((err) => {
                throw err;
            });

    }

    create = withLogging(this.create, this.constructor.name);
    readOne = withLogging(this.readOne, this.constructor.name);
    readAll = withLogging(this.readAll, this.constructor.name);
    update = withLogging(this.update, this.constructor.name);
    delete = withLogging(this.delete, this.constructor.name);

}

module.exports = DeckDataService;