class Deck {
    constructor(id, name, cards = []) {
        this.id = id;
        this.name = name;
        this.cards = cards;
    }

    static of = (props) => {
        const id = props.id;
        const name = props.name;
        const cards = props.cards || [];

        if (!name) {
            throw new Error('Unable to create Deck object from', props);
        } else {
            return new Deck(id, name, cards);
        }
    };
}

module.exports = Deck;
