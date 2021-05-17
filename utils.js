// A...Z = [65, 90]
// a...z = [97, 122]
const alphabetRanges = [
    [65, 90],
    [97, 122]
];

const alphabetLenght = 26;

function checkAlphabetRange(char) {
    // return false if empty string
    if (char === '') return false;

    for (alphabetRange of alphabetRanges) {
        const charCode = char.charCodeAt();

        if (charCode >= alphabetRange[0] && charCode <= alphabetRange[1]) {
            return true
        };
    }
    return false;
}

function encryptLetter(letter, shift) {
    if (typeof letter !== "number") throw new Error('non-number value');

    let encryptedValue;
    const shiftSign = shift >= 0 ? 'positive' : 'negative';
    const letterCase = (letter <= 122 && letter >= 97) ? 'lower' : 'upper';

    const shiftedValue = letter + (shift % 26);
    let isMoreThanAlphabetRange;

    if (letterCase === 'lower') isMoreThanAlphabetRange = shiftedValue > 122 || shiftedValue < 97;
    if (letterCase === 'upper') isMoreThanAlphabetRange = shiftedValue > 90 || shiftedValue < 65;

    if (isMoreThanAlphabetRange) {
        const sign = (shiftSign === 'positive') ? -1 : 1;
        encryptedValue = shiftedValue + alphabetLenght * sign;
    } else {
        encryptedValue = shiftedValue;
    }

    return encryptedValue;
}

module.exports = {
    checkAlphabetRange,
    encryptLetter
}