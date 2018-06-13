
const {
    ArrayNode,
    KeyValueNode,
    LiteralNode,
    NumberNode,
    ObjectNode,
    StringNode,
} = require('../parsing/nodes/index.js');

class InlineVisitor {
    constructor(stringBuilder, EOL) {
        this.stringBuilder = stringBuilder;
        this.EOL = EOL;
        this.tabOffset = 0;
        this.insertTabs = true;
    }

    visit(node) {
        if (node instanceof ArrayNode) { this.visitArray(node); }
        if (node instanceof KeyValueNode) { this.visitKeyValue(node); }
        if (node instanceof LiteralNode) { this.visitLiteral(node); }
        if (node instanceof NumberNode) { this.visitNumber(node); }
        if (node instanceof ObjectNode) { this.visitObject(node); }
        if (node instanceof StringNode) { this.visitString(node); }
    }

    visitObject(object) {
        this.stringBuilder.push('{');

        if (object.items.length > 0) {
            this.pushNewLine();
            this.tabOffset++;
        }

        let item;
        for (let i = 0; i < object.items.length; i++) {
            item = object.items[i];
            item.accept(this);
            if (i < object.items.length - 1) {
                this.stringBuilder.push(',');
                this.pushNewLine();
            }
        }

        if (object.items.length > 0) {
            this.pushNewLine();
            this.tabOffset--;
        }

        this.stringBuilder.push(this.getTabs());
        this.stringBuilder.push('}');
    }

    visitKeyValue(keyValue) {
        this.stringBuilder.push(this.getTabs());
        this.stringBuilder.push('"');
        this.stringBuilder.push(keyValue.key);
        this.stringBuilder.push('": ');
        this.insertTabs = false;
        keyValue.value.accept(this);
    }

    visitArray(array) {
        if (this.insertTabs) {
            this.stringBuilder.push(this.getTabs());
        }

        this.stringBuilder.push('[');

        if (array.items.length > 0) {
            this.pushNewLine();
            this.tabOffset++;
        }

        let item;
        for (let i = 0; i < array.items.length; i++) {
            item = array.items[i];
            item.accept(this);
            if (i < array.items.length - 1) {
                this.stringBuilder.push(',');
                this.pushNewLine();
            }
        }

        if (array.items.length > 0) {
            this.pushNewLine();
            this.tabOffset--;
        }

        this.stringBuilder.push(this.getTabs());
        this.stringBuilder.push(']');
    }

    visitNumber(number) {
        if (this.insertTabs) {
            this.stringBuilder.push(this.getTabs());
        }

        this.stringBuilder.push(number.value);
    }

    visitString(string) {
        if (this.insertTabs) {
            this.stringBuilder.push(this.getTabs());
        }

        this.stringBuilder.push('"');
        this.stringBuilder.push(string.value);
        this.stringBuilder.push('"');
    }

    visitLiteral(literal) {
        if (this.insertTabs) {
            this.stringBuilder.push(this.getTabs());
        }

        this.stringBuilder.push(literal.value);
    }

    getTabs() {
        const tabs = [];

        for (let i = 0; i < this.tabOffset; i++) {
            tabs.push('\t');
        }

        return tabs.join('');
    }

    pushNewLine() {
        this.stringBuilder.push(this.EOL);
        this.insertTabs = true;
    }
}

module.exports = { InlineVisitor };
