const DatabaseConnector = require("./DatabaseConnector");
const Deck = require('../models/Deck');

class DeckDataService {

    #db = null;

    constructor(conn = null) {

        try {
            if (conn) {
                this.#db = conn;
            } else {
                this.#db = DatabaseConnector.getConn();
            }
        } catch (err) {
            console.error(err);
            this.#db = null;
            throw new Error("Failed to connect to database.");
        }
    }

    create = async (deck) => {

        console.log('Entering DeckDataService create() with deck =', deck);

        let id = 0;

        return await this.#db.one(
            'INSERT INTO deck_table (name) VALUES ($1) RETURNING id',
            [deck.name]
        ).then((result) => {
            id = result.id;
            console.log('Leaving DeckDataService create() with id =', id);
            return id;
        }).catch((err) => {
            console.error(err);
            return null;
        });

    }

    readOne = async (id) => {

        console.log('Entering DeckDataService readOne() with id =', id);

        try {

            let deck;

            deck = await this.#db.one(
                'SELECT * FROM deck_table WHERE id = $1',
                [id]
            ).then((result) => {
                return result;
            }).catch((err) => {
                return null;
            });

            console.log('Leaving DeckDataService readOne() with deck =', deck);
            return deck;

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    readAll = async () => {

        console.log('Entering DeckDataService readAll().');

        try {

            const decks = await this.#db.any('SELECT * FROM deck_table')
                .then((result) => {
                    return result;
                }).catch((err) => {
                    return [];
                });

            console.log('Leaving DeckDataService readAll() with', decks.length, 'results.');
            return decks;

        } catch (err) {
            console.error(err);
            throw err;
        }

    }

    update = async (deck) => {

        console.log('Entering DeckDataService update() with deck =', deck);

        return await this.#db.none(
            'UPDATE deck_table SET name = $1 WHERE id = $2',
            [deck.name, deck.id])
            .then((result) => {
                console.log('Leaving DeckDataService update() after successful update.');
                return 1;
            }).catch((err) => {
                console.error('Leaving DeckDataService update() with error:', err);
                return 0;
            });

    }

    delete = async (id) => {

        console.log('Entering DeckDataService delete() with id =', id);

        return await this.#db.none('DELETE FROM deck_table WHERE id = $1', [id])
            .then((result) => {
                console.log('Leaving DeckDataService delete() after successful deletion.');
                return 1; // success
            }).catch((err) => {
                console.error('Leaving DeckDataService delete() with error:', err);
                return 0; // fail
            });

    }

}

module.exports = DeckDataService;