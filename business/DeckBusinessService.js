const Card = require('../models/Card');
const Deck = require('../models/Deck');
const DeckDataService = require('../data/services/DeckDataService');
const CardDataService = require('../data/services/CardDataService');

const { withLogging } = require('../config/logMethod');

class DeckBusinessService {
    #deck_repo;
    #card_repo;

    constructor (deckRepo = new DeckDataService(), cardRepo = new CardDataService()) {
        this.#deck_repo = deckRepo;
        this.#card_repo = cardRepo;
    }

    /**
       * Creates a deck.
       * @param {Deck} deck
       * @returns the created Deck's ID
       */
    create = async (deck) => {
        return await this.#deck_repo.create(deck);
    };

    /**
       * The ID of the deck to query
       * @param {Number} id
       * @returns the deck
       */
    readOne = async (id) => {
        const deckEntity = await this.#deck_repo.readOne(id);

        const cardEntities = await this.#card_repo.readAllbyDeckId(id);

        const cards = cardEntities.map(x => Card.of(x));

        const result = Deck.of({ ...deckEntity, cards });

        return result;
    };

    /**
       * Get all decks from the database
       * @returns the decks from the database
       */
    readAll = async () => {
        const deckEntities = await this.#deck_repo.readAll();
        let result = [];

        for (const deckEntity of deckEntities) {
            const cardEntities = await this.#card_repo.readAllbyDeckId(deckEntity.id);

            let cards = [];

            for (const cardEntity of cardEntities) {
                cards = [...cards, Card.of(cardEntity)];
            }

            const deck = Deck.of({ id: deckEntity.id, name: deckEntity.name, cards });
            result = [...result, deck];
        }

        return result;
    };

    /**
       * Updates deck in database
       * @param {Deck} deck the deck to update
       * @returns the result
       */
    update = async (deck) => {
        const result = await this.#deck_repo.update(deck);

        return result;
    };

    /**
       * Remove a deck from the database.
       * @param {Number} id the deck ID
       * @returns the result
       */
    delete = async (id) => {
        const result = await this.#deck_repo.delete(id);

        return result;
    };

    create = withLogging(this.create, this.constructor.name);
    readOne = withLogging(this.readOne, this.constructor.name);
    readAll = withLogging(this.readAll, this.constructor.name);
    update = withLogging(this.update, this.constructor.name);
    delete = withLogging(this.delete, this.constructor.name);
}

module.exports = DeckBusinessService;
