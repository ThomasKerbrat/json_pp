
const { help } = require('./utils/help.js');

// Checking for arguments options

if (process.argv.length < 3) {
    help();
    process.exit(1);
}

let argNoColors = false, argInline = false;
for (let argument of process.argv) {
    if (['-h', '--help'].includes(argument)) {
        help();
        process.exit(0);
    }

    if (['-n', '--no-colors'].includes(argument)) {
        argNoColors = true;
        continue;
    }

    if (['-i', '--inline'].includes(argument)) {
        argInline = true;
        continue;
    }
}

// Requires

const fs = require('fs');
const os = require('os');

const { InlineineVisitor } = require('./visitors/inline-visitor.js');
const { MultiLineineVisitor } = require('./visitors/multi-line-visitor.js');
const { Parser } = require('./parsing/parser.js');

const path = process.argv[process.argv.length - 1];

// Validate inputs

let stringContent;
try {
    stringContent = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.log([path, ': No such file'].join(''));
    process.exit(1);
}

let content;
try {
    content = JSON.parse(stringContent);
} catch (error) {
    console.log([path, ': ', error.message].join(''));
    process.exit(1);
}

// json_ppc

const rootNode = Parser.parse(content);
const stringBuilder = [];
const visitor = argInline
    ? new InlineineVisitor(stringBuilder, !argNoColors)
    : new MultiLineineVisitor(stringBuilder, os.EOL, !argNoColors);

visitor.visit(rootNode);
console.log(stringBuilder.join(''));
