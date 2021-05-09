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

    const isLowerCase = letter <= 122 && letter >= 97;
    // if (isLowerCase) {
    //    let encryptedValue = letter + (shift % 26);
    //    return encryptedValue > 122 ? 97 + encryptedValue % 122 : ;
    // }

}

module.exports = {
    checkAlphabetRange,
    encryptLetter
}