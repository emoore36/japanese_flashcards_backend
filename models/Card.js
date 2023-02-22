class Card {

    constructor(id, front_text, back_text, deck_id) {
        this.id = id;
        this.front_text = front_text;
        this.back_text = back_text;
        this.deck_id = deck_id;
    }

    toString = () => {
        return `Card[id=${id},front_text=${front_text},back_text=${back_text},deck_id=${this.deck_id}]`
    }

}

module.exports = Card;