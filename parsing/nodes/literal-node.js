
class LiteralNode {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        visitor.visitLiteral(this);
    }
}

module.exports = { LiteralNode };
