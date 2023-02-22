const DatabaseConnector = require("./DatabaseConnector");

class CardDataService {

    db = DatabaseConnector.getConn();

    create = (card) => {

        console.log('Entering CardDataService create() with card =', card);

        db.one(
            'INSERT INTO card_table (front_text, back_text, deck_id) VALUES ($1, $2, $3)',
            [card.front_text, card.back_text, card.deck_id]
        ).then((result) => {
            console.log('Leaving CardDataService create() with card id =', result.id);
            return (result.id);
        }).catch((err) => {
            console.err(err);
            throw err;
        });
    };

    readOne = (id) => {
        console.log('Entering CardDataService readOne() with id =', id);

        this.db.one(
            'SELECT * FROM card_table WHERE id = $1',
            [id]
        ).then((result) => {
            console.log('Leaving CardDataService readOne() with card =', result);
            return result;
        }).catch((err) => {
            console.error(err);
            throw err;
        });
    };

    readAllbyDeckId = (deck_id) => {

    };

    update = (card) => {

    }

    delete = (id) => {

    };

}

module.exports = CardDataService;