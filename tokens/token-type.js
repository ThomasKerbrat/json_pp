
const tokenType = Object.freeze({
    leftSquareBracket: 'leftSquareBracket',
    leftCurlyBracket: 'leftCurlyBracket',
    rightSquareBracket: 'rightSquareBracket',
    rightCurlyBracket: 'rightCurlyBracket',
    colon: 'colon',
    comma: 'comma',

    false: 'false',
    null: 'null',
    true: 'true',

    minus: 'minus',
    plus: 'plus',
    integer: 'integer',
    fraction: 'fraction',
    exponent: 'exponent',
});

module.exports = tokenType;
