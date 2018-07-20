
const fs = require('fs');

function help() {
    const helpText = fs.readFileSync('src/utils/help.txt', 'utf-8');
    console.log(helpText);
}

module.exports = { help };
