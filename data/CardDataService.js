const DatabaseConnector = require("./DatabaseConnector");

class CardDataService {

    db = DatabaseConnector.getConn();

    #logEntry = (methodName, paramData = 'N/A') => {
        console.log(`Entering CardDataService ${methodName}() with data:`, paramData);
    };

    #logExit = (methodName, resultData) => {
        console.log(`Leaving CardDataService ${methodName}() with result:`, resultData);
    }

    create = async (card) => {

        this.#logEntry('create', card);

        return await db.one(
            'INSERT INTO card_table (front_text, back_text, deck_id) VALUES ($1, $2, $3)',
            [card.front_text, card.back_text, card.deck_id]
        ).then((result) => {
            // console.log('Leaving CardDataService create() with card id =', result.id);
            this.#logExit('create', result.id);
            return (result.id);
        }).catch((err) => {
            this.#logExit('create', null);
            return null;
        });
    };

    readOne = async (id) => {

        this.#logEntry('readOne', id);

        return await this.db.one(
            'SELECT * FROM card_table WHERE id = $1',
            [id]
        ).then((result) => {
            this.#logExit('readOne', result);
            return result;
        }).catch((err) => {
            this.#logExit('readOne', null);
            return null;
        });
    };

    readAllbyDeckId = async (deck_id) => {

        this.#logEntry('readAllByDeckId', deck_id);

        return await this.db.any(
            'SELECT * FROM card_table WHERE deck_id = $1',
            [deck_id]
        ).then((result) => {
            this.#logExit('readAllByDeckId', result);
            return result;
        }).catch((err) => {
            this.#logExit('readAllByDeckId', []);
            return [];
        });

    };

    readAll = async () => {

        this.#logEntry('readAll')

        return await this.db.any(
            'SELECT * FROM card_table'
        ).then((result) => {
            this.#logExit('readAll', result);
            return result;
        }).catch((err) => {
            this.#logExit('readAll', []);
            return [];
        });

    }

    update = async (card) => {

        this.#logEntry('update', card);

        return await this.db.any(
            'UPDATE card_table SET front_text = $1, back_text = $2 WHERE id = $3',
            [card.front_text, card.back_text, card.id]
        ).then((result) => {
            this.#logExit('update', result);
            return result;
        }).catch((err) => {
            this.#logExit('update', null);
        });

    }

    delete = async (id) => {
        this.#logEntry('delete', id);

        return await this.db.none(
            'DELETE FROM card_table WHERE id = $1',
            [id]
        ).then((result) => {
            this.#logExit('delete', 'success');
        }).catch((err) => {
            this.#logExit('delete', 'failure');
        });

    };

}

module.exports = CardDataService;