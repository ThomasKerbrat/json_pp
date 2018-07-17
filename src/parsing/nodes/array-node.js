
class ArrayNode {
    constructor(items) {
        this.items = items;
    }

    accept(visitor) {
        visitor.visitArray(this);
    }
}

module.exports = { ArrayNode };
