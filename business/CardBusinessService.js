const CardEntity = require('../data/entities/CardEntity');
const CardDataService = require('../data/services/CardDataService');
const Card = require('../models/Card');

const { withLogging } = require('../config/logMethod');

class CardBusinessService {
    #repo;

    constructor (repo = new CardDataService()) {
        this.#repo = repo;
    }

    /**
       * Adds the card to the database
       * @param {Card} card the card to add
       * @returns the ID of the created card.
       */
    create = async (card) => {
        return Card.of(await this.#repo.create(CardEntity.of(card)));
    };

    /**
       * Retrieves one card from the database.
       * @param {Number} id the card ID
       * @returns the card.
       */
    readOne = async (id) => {
        return Card.of(await this.#repo.readOne(id));
    };

    /**
       * Retrieves all cards from a specific deck.
       * @param {Number} deckId the deck ID
       * @returns a list of Card objects.
       */
    readAllByDeckId = async (deckId) => {
        return await this.#repo.readAllbyDeckId(deckId).map(x => Card.of(x));
    };

    /**
       * Retrieves all cards from the database.
       * @returns a list of cards.
       */
    readAll = async () => {
        const entities = await this.#repo.readAll();

        return entities.map(x => Card.of(x));
    };

    /**
       * Updates a card in the database
       * @param {Card} card the updated card.
       * @returns the ID of the card.
       */
    update = async (card) => {
        return this.#repo.update(card);
    };

    /**
       * Deletes the card from the database.
       * @param {Number} id the ID of the card
       * @returns 1 (success)
       */
    delete = async (id) => {
        return this.#repo.delete(id);
    };

    create = withLogging(this.create, this.constructor.name);
    readOne = withLogging(this.readOne, this.constructor.name);
    readAllByDeckId = withLogging(this.readAllByDeckId, this.constructor.name);
    readAll = withLogging(this.readAll, this.constructor.name);
    update = withLogging(this.update, this.constructor.name);
    delete = withLogging(this.delete, this.constructor.name);
}

module.exports = CardBusinessService;
