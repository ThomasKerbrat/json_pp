
const fs = require('fs');
const path = require('path');

function help() {
    const helpFilePath = path.join(__dirname, 'help.txt');
    const helpText = fs.readFileSync(helpFilePath, 'utf-8');
    console.log(helpText);
}

module.exports = { help };
