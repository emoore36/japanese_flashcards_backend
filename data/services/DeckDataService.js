const DatabaseConnector = require("../DatabaseConnector");
const DeckEntity = require('../entities/DeckEntity');

class DeckDataService {

    #db = DatabaseConnector.getConn();

    /**
     * Adds a Deck instance to the database.
     * @param {DeckEntity} deck the deck to persist.
     * @returns the ID of the persisted deck.
     */
    create = async (deck) => {

        console.log('Entering DeckDataService create() with deck =', deck);

        const id = Number(await this.#db.one(
            'INSERT INTO deck_table (name) VALUES ($1) RETURNING id',
            [deck.name]
        ).then((result) => {
            return result.id;
        }).catch((err) => {
            console.error(err);
            throw err;
        }));

        console.log('Leaving DeckDataService create() with id =', id);
        return id;

    }

    /**
     * Retrieves from the database the deck associated with the given ID.
     * @param {Number} id the deck ID. 
     * @returns the deck.
     */
    readOne = async (id) => {

        console.log('Entering DeckDataService readOne() with id =', id);

        const deck = await this.#db.one(
            'SELECT * FROM deck_table WHERE id = $1',
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

        console.log('Leaving DeckDataService readOne() with deck =', deck);
        return deck;

    }

    /**
     * Retrieves all decks from the database.
     * @returns All the decks.
     */
    readAll = async () => {

        console.log('Entering DeckDataService readAll().');

        const decks = await this.#db.any('SELECT * FROM deck_table')
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
                throw err;
            });

        console.log('Leaving DeckDataService readAll() with', decks.length, 'results.');
        return decks;

    }

    /**
     * Updates a deck instance in the database with the given deck parameter.
     * @param {DeckEntity} deck the given deck to update. 
     * @returns the number of rows affected.
     */
    update = async (deck) => {

        console.log('Entering DeckDataService update() with deck =', deck);

        const result = await this.#db.none(
            'UPDATE deck_table SET name = $1 WHERE id = $2',
            [deck.name, deck.id])
            .then((result) => {
                return 1;
            }).catch((err) => {
                console.log(err);
                throw err;
            });

        console.log('Leaving DeckDataService update() with result =', result);
        return result;

    }

    /**
     * Removes the deck associated with the given ID.
     * @param {Number} id the ID of the deck to delete. 
     * @returns the number of rows affected.
     */
    delete = async (id) => {

        console.log('Entering DeckDataService delete() with id =', id);

        return await this.#db.none('DELETE FROM deck_table WHERE id = $1', [id])
            .then((result) => {
                console.log('Leaving DeckDataService delete() after successful deletion.');
                return 1; // success
            }).catch((err) => {
                console.error(err);
                throw err;
            });

    }

}

module.exports = DeckDataService;