
const {
    ArrayNode,
    KeyValueNode,
    LiteralNode,
    NumberNode,
    ObjectNode,
    StringNode,
} = require('../parsing/nodes/index.js');
const { Colors } = require('../utils/colors.js');

class InlineineVisitor {
    constructor(stringBuilder, colors) {
        this.stringBuilder = stringBuilder;
        this.colors = colors;
    }

    visit(node) {
        if (node instanceof ArrayNode) { return this.visitArray(node); }
        if (node instanceof KeyValueNode) { return this.visitKeyValue(node); }
        if (node instanceof LiteralNode) { return this.visitLiteral(node); }
        if (node instanceof NumberNode) { return this.visitNumber(node); }
        if (node instanceof ObjectNode) { return this.visitObject(node); }
        if (node instanceof StringNode) { return this.visitString(node); }
    }

    visitObject(object) {
        this.stringBuilder.push('{');

        const sortedKeys = object.items.map(item => item.key).sort();
        for (let i = 0; i < object.items.length; i++) {
            const item = object.items.find(item => item.key === sortedKeys[i]);
            item.accept(this);
            if (i < object.items.length - 1) {
                this.stringBuilder.push(', ');
            }
        }

        this.stringBuilder.push('}');
    }

    visitKeyValue(keyValue) {
        this.visitString({ value: keyValue.key });
        this.stringBuilder.push(': ');
        keyValue.value.accept(this);
    }

    visitArray(array) {
        this.stringBuilder.push('[');

        let item;
        for (let i = 0; i < array.items.length; i++) {
            item = array.items[i];
            item.accept(this);
            if (i < array.items.length - 1) {
                this.stringBuilder.push(', ');
            }
        }

        this.stringBuilder.push(']');
    }

    visitNumber(number) {
        this.stringBuilder.push(this.colors ? Colors.apply(number.value, 'yellow') : number.value);
    }

    visitString(string) {
        if (this.colors) {
            this.stringBuilder.push(Colors.open('green'));
        }

        this.stringBuilder.push('"');
        this.stringBuilder.push(string.value);
        this.stringBuilder.push('"');

        if (this.colors) {
            this.stringBuilder.push(Colors.close('green'));
        }
    }

    visitLiteral(literal) {
        const value = !this.colors
            ? literal.value
            : literal.value === 'null'
                ? Colors.apply(literal.value, 'bold')
                : literal.value === 'true' || literal.value === 'false'
                    ? Colors.apply(literal.value, 'yellow')
                    : literal.value;
        this.stringBuilder.push(value);
    }
}

module.exports = { InlineineVisitor };
