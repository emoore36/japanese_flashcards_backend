const Card = require('../models/Card');
const Deck = require('../models/Deck');
const DeckEntity = require('../data/entities/DeckEntity');
const DeckDataService = require('../data/services/DeckDataService');
const CardDataService = require('../data/services/CardDataService');

const { withLogging } = require('../config/logMethod');

class DeckBusinessService {

    #deck_repo = new DeckDataService();
    #card_repo = new CardDataService();

    #logEntry = (methodName, paramData = 'N/A') => {
        console.log(`Entering DeckBusinessService ${methodName}() with data:`, paramData);
    };

    #logExit = (methodName, resultData) => {
        console.log(`Leaving DeckBusinessService ${methodName}() with result:`, resultData);
    }

    /**
     * Creates a deck.
     * @param {Deck} deck 
     * @returns the created Deck's ID
     */
    create = async (deck) => {

        this.#logEntry('create', deck);

        const result = await this.#deck_repo.create(deck);

        this.#logExit('create', result);

        return result;

    };

    /**
     * The ID of the deck to query
     * @param {Number} id 
     * @returns the deck
     */
    readOne = async (id) => {

        this.#logEntry('readOne', id);

        let result;

        const deckEntity = await this.#deck_repo.readOne(id);

        const cardEntities = await this.#card_repo.readAllbyDeckId(id);

        const cards = cardEntities.map(x => Card.of(x));


        this.#logExit('readOne', result);

        return result;

    };

    /**
     * Get all decks from the database
     * @returns the decks from the database
     */
    readAll = async () => {

        const deckEntities = await this.#deck_repo.readAll();
        let result = [];

        for (let deckEntity of deckEntities) {

            let cardEntities = await this.#card_repo.readAllbyDeckId(deckEntity.id);

            let cards = [];

            for (let cardEntity of cardEntities) {

                cards = [...cards, Card.of(cardEntity)];
            }

            let deck = Deck.of({ id: deckEntity.id, name: deckEntity.name, cards: cards });
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

        this.#logEntry('update', deck);

        const result = await this.#deck_repo.update(deck);

        this.#logExit('update', result);

        return result;

    };

    /**
     * Remove a deck from the database.
     * @param {Number} id the deck ID
     * @returns the result
     */
    delete = async (id) => {

        this.#logEntry('delete', id);

        const result = await this.#deck_repo.delete(id);

        this.#logExit('delete', result);

        return result;

    };


    loggedReadAll = withLogging(this.readAll, this.constructor.name);

}

module.exports = DeckBusinessService;