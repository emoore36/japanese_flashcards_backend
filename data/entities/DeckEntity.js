class DeckEntity {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static of = (props) => {
        const id = props.id;
        const name = props.name;

        if (!name) {
            throw new Error("Unable to create DeckEntity object from", props);
        } else {
            return new Deck(id, name);
        }

    }

    toString = () => {
        return `DeckEntity[id=${id},name=${name}]`
    }

}

module.exports = DeckEntity;