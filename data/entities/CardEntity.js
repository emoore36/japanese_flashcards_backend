class CardEntity {
    constructor(id, frontText, backText, deckId) {
        this.id = id;
        this.front_text = frontText;
        this.back_text = backText;
        this.deck_id = deckId;
    }

    static of = (props) => {
        const id = props.id;
        const frontText = props.front_text;
        const backText = props.back_text;
        const deckId = props.deck_id;

        if (!frontText || !backText || !deckId) {
            throw new Error('Unable to create CardEntity object from', props);
        } else {
            return new CardEntity(id, frontText, backText, deckId);
        }
    };
}

module.exports = CardEntity;
