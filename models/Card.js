class Card {

    constructor(id, front_text, back_text) {
        this.id = id;
        this.front_text = front_text;
        this.back_text = back_text;
    }

    static of = (props) => {
        const id = props.id;
        const front_text = props.front_text;
        const back_text = props.back_text;

        if (!front_text || !back_text) {
            throw new Error("Unable to create Card object from", props);
        } else {
            return new Card(id, front_text, back_text);
        }

    }

    toString = () => {
        return `Card[id=${id},front_text=${front_text},back_text=${back_text}]`
    }

}

module.exports = Card;