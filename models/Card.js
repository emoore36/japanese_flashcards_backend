class Card {

    constructor(id, front_text, back_text, deck_id) {
        this.id = id;
        this.front_text = front_text;
        this.back_text = back_text;
        this.deck_id = deck_id;
    }

    static of = (props) => {
        const id = props.id;
        const front_text = props.front_text;
        const back_text = props.back_text;
        const deck_id = props.deck_id;

        if (!front_text || !back_text || !deck_id) {
            throw new Error("Unable to create Card object from", props);
        } else {
            return new Card(id, front_text, back_text, deck_id);
        }

    }

    toString = () => {
        return `Card[id=${id},front_text=${front_text},back_text=${back_text},deck_id=${this.deck_id}]`
    }

}

module.exports = Card;