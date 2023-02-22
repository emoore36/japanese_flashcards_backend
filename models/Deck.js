class Deck {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    toString = () => {
        return `Deck[id=${id},name=${name}]`
    }

}

module.exports = Deck;