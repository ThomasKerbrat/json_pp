
class StringNode {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        visitor.visitString(this);
    }
}

module.exports = { StringNode };
