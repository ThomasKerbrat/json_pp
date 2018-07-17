
const {
    ArrayNode,
    KeyValueNode,
    LiteralNode,
    NumberNode,
    ObjectNode,
    StringNode
} = require('./nodes/index.js');

class Parser {
    static parse(value) {
        if (value === null) { return Parser.parseNull(value); }
        if (typeof value === 'boolean') { return Parser.parseLiteral(value); }
        if (typeof value === 'number') { return Parser.parseNumber(value); }
        if (typeof value === 'string') { return Parser.parseString(value); }
        if (Array.isArray(value)) { return Parser.parseArray(value); }
        if (typeof value === 'object') { return Parser.parseObject(value); }
        return '';
    }

    static parseArray(array) {
        let items = [];

        for (let item of array) {
            items.push(Parser.parse(item));
        }

        return new ArrayNode(items);
    }

    static parseObject(object) {
        const keys = Object.keys(object);
        const keyValueNodes = [];

        for (let key of keys) {
            keyValueNodes.push(new KeyValueNode(key, Parser.parse(object[key])));
        }

        return new ObjectNode(keyValueNodes);
    }

    static parseNumber(number) {
        return new NumberNode(number);
    }

    static parseString(string) {
        return new StringNode(string);
    }

    static parseLiteral(literal) {
        return new LiteralNode(literal.toString());
    }

    static parseNull() {
        return new LiteralNode('null');
    }
}

module.exports = { Parser };
