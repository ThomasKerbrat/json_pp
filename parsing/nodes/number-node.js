
class NumberNode {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        visitor.visitNumber(this);
    }
}

module.exports = { NumberNode };
