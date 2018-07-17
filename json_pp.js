
const fs = require('fs');
const os = require('os');

const { InlineineVisitor } = require('./visitors/inline-visitor');
const { MultiLineineVisitor } = require('./visitors/multi-line-visitor');
const {
    ArrayNode,
    KeyValueNode,
    LiteralNode,
    NumberNode,
    ObjectNode,
    StringNode,
} = require('./parsing/nodes/index.js');

// const [, , path] = process.argv;
// const stringContent = fs.readFileSync(path, 'utf-8');
// const objectContent = JSON.parse(stringContent);
// const json = JSON.stringify(objectContent, null, 2);
// console.log(json);

const object = { "name": "Thomas Kerbrat", "age": 22.5, "emptyobj": {}, "info": ["toto", 123, [null, true, false, {}]] };

const objectNode = new ObjectNode([
    new KeyValueNode('name', new StringNode('Thomas Kerbrat')),
    new KeyValueNode('age', new NumberNode(22.5)),
    new KeyValueNode('emptyobj', new ObjectNode([])),
    new KeyValueNode('info', new ArrayNode([
        new StringNode('toto'),
        new NumberNode(123),
        new ArrayNode([
            new LiteralNode('null'),
            new LiteralNode('true'),
            new LiteralNode('false'),
            new ObjectNode([]),
        ])
    ]))
]);

{
    const stringBuilder = [];
    const visitor = new InlineineVisitor(stringBuilder);
    visitor.visit(objectNode);
    console.log(stringBuilder.join(''));
}

{
    const stringBuilder = [];
    const visitor = new MultiLineineVisitor(stringBuilder, os.EOL);
    visitor.visit(objectNode);
    console.log(stringBuilder.join(''));
}
