const fs = require('fs');
const stream = require('stream');

const utils = require('./utils');

function checkShift(shift) {
    if (!shift) throw new Error('--shift did`t indicated');
}

function checkAction(action) {
    if (!action) throw new Error('--action did`t indicated');
}

function determineReadStream(input) {
    if (!input) {
        return process.stdin;
    }

    if (!fs.existsSync(input)) {
        process.stderr.write('file doesn`t exist\n');
        return null;
    }

    try {
        fs.accessSync(input, fs.constants.R_OK);
    } catch (err) {
        process.stderr.write('no permission to read file\n');
        return null;
    }

    if (fs.statSync(input).isDirectory()) {
        process.stderr.write('can`t read folder\n');
        return null;
    }

    return fs.createReadStream(input);
}

function determineWriteStream(output) {
    if (!output) {
        return process.stdout;
    }

    if (!fs.existsSync(output)) {
        process.stderr.write('file doesn`t exist\n');
        return null;
    }

    try {
        fs.accessSync(output, fs.constants.W_OK);
    } catch (err) {
        process.stderr.write('no permission to read file\n');
        return null;
    }

    if (fs.statSync(output).isDirectory()) {
        process.stderr.write('can`t write to folder\n');
        return null;
    }

    return fs.createWriteStream(output);
}

function createTransformStream(shift = 0, action = 'encode') {
    return new stream.Transform({
        transform(chunk, encoding, callback) {
            const chunkStr = chunk.toString();
            this.push(caesarCipher(chunkStr, action === 'encode' ? shift : shift * -1));
            callback();
        }
    })
}

function caesarCipher(input, shift = 0) {
    if (typeof input !== 'string') {
        throw new Error('passed input argument is not string');
    }

    let inputArr = [];
    let outputArr = [];
    let output = '';

    // 1) input -> inputArr
    for (char of input) {
        isLetter = utils.checkAlphabetRange(char);
        inputArr.push(isLetter ? char.charCodeAt() : char);
    }

    console.log(inputArr);

    // 2) inputArr -> outputArr
    for (value of inputArr) {
        if (typeof value === 'number') {
            outputArr.push(utils.encryptLetter(value, shift));
        } else {
            outputArr.push(value);
        }
    }

    console.log(outputArr);

    outputArr = inputArr;
    output = outputArr;

    return output
}

module.exports = {
    checkShift,
    checkAction,
    determineReadStream,
    determineWriteStream,
    createTransformStream,
    caesarCipher,
}