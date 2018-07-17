
const fs = require('fs');
const os = require('os');

const { MultiLineineVisitor } = require('./visitors/multi-line-visitor');
const { Parser } = require('./parsing/parser.js');

const [, , path] = process.argv;
const stringContent = fs.readFileSync(path, 'utf-8');
const content = JSON.parse(stringContent);
const rootNode = Parser.parse(content);

const stringBuilder = [];
const visitor = new MultiLineineVisitor(stringBuilder, os.EOL);
visitor.visit(rootNode);
console.log(stringBuilder.join(''));
