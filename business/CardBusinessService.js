const CardEntity = require("../data/entities/CardEntity");
const CardDataService = require("../data/services/CardDataService");
const Card = require('../models/Card');

class CardBusinessService {

    #repo = new CardDataService();

    #logEntry = (methodName, paramData = 'N/A') => {
        console.log(`Entering CardBusinessService ${methodName}() with data:`, paramData);
    };

    #logExit = (methodName, resultData) => {
        console.log(`Leaving CardBusinessService ${methodName}() with result:`, resultData);
    }

    create = async (card) => {

        this.#logEntry('create', card);

        const result = Card.of(await this.#repo.create(CardEntity.of(card)));

        this.#logExit('create', result);

        return result;

    };

    readOne = async (id) => {

        this.#logEntry('readOne', id);

        const result = Card.of(await this.#repo.readOne(id));

        this.#logExit('readOne', result);

        return result;

    };

    readAllByDeckId = async (deck_id) => {

        this.#logEntry('readAllByDeckId', deck_id);

        const entities = await this.#repo.readAllbyDeckId(deck_id);

        const result = entities.map(x => Card.of(x));

        this.#logExit('readAllByDeckId', result);

        return result;

    };

    readAll = async () => {

        this.#logEntry('readAll');

        const entities = await this.#repo.readAll();

        const result = entities.map(x => Card.of(x));

        this.#logExit('readAll', result);

        return result;
    }

    update = async (card) => {

        this.#logEntry('update', card);

        const result = null;


        this.#logExit('update', result);

        return result;
    }

    delete = async (id) => {

        this.#logEntry('delete', id);

        const result = null;

        this.#logExit('delete', result);

        return result;
    };

}

module.exports = CardBusinessService;