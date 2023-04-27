class Card {
    constructor(id = 0, frontText = '', backText = '', deckId = 0) {
        this.id = id;
        this.front_text = frontText;
        this.back_text = backText;
        this.deck_id = deckId;
    }

    static of = (props) => {
        const id = props.id || 0;
        const frontText = props.front_text || '';
        const backText = props.back_text || '';
        const deckId = props.deck_id || 0;

        if (!frontText || !backText || !deckId) {
            throw new Error('Unable to create Card object from', props);
        } else {
            return new Card(id, frontText, backText, deckId);
        }
    };
}

module.exports = Card;
