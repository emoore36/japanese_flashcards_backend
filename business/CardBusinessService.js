const CardEntity = require("../data/entities/CardEntity");
const CardDataService = require("../data/services/CardDataService");
const Card = require('../models/Card');

const { withLogging } = require('../config/logMethod');

class CardBusinessService {

    #repo = new CardDataService();

    create = async (card) => {

        const result = Card.of(await this.#repo.create(CardEntity.of(card)));

        return result;

    };

    readOne = async (id) => {

        const result = Card.of(await this.#repo.readOne(id));

        return result;

    };

    readAllByDeckId = async (deck_id) => {

        const entities = await this.#repo.readAllbyDeckId(deck_id);

        const result = entities.map(x => Card.of(x));

        return result;

    };

    readAll = async () => {

        const entities = await this.#repo.readAll();

        const result = entities.map(x => Card.of(x));

        return result;
    }

    update = async (card) => {

        const result = null;

        return result;
    }

    delete = async (id) => {

        const result = null;

        return result;
    };

    create = withLogging(this.create, this.constructor.name);
    readOne = withLogging(this.readOne, this.constructor.name);
    readAllByDeckId = withLogging(this.readAllByDeckId, this.constructor.name);
    readAll = withLogging(this.readAll, this.constructor.name);
    update = withLogging(this.update, this.constructor.name);
    delete = withLogging(this.delete, this.constructor.name);

}

module.exports = CardBusinessService;