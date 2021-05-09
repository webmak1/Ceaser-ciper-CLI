const fs = require('fs');
const stream = require('stream');
const path = require('path');

const utils = require('./utils');

function checkShift(shift) {
    if (!shift) {
        try {
            throw new Error('--shift did`t indicated');
        } catch (err) {
            return null
        }
    }
    
    if (Number.isNaN(Number(shift)) || !Number.isInteger(Number(shift))) {
        try {
            throw new Error('--shift value is inccorect');
        } catch (err) {
            return null
        }
    }

    return true;
}

function checkAction(action) {
    if (!action) {
        try {
            throw new Error('--action did`t indicated');
        } catch (err) {
            return null
        }
    }
    
    if (action !== 'encode' && action !== 'decode') {
        try {
            throw new Error('--action value is incorrect');
        } catch (err) {
            return null
        }
    }

    return true;
}

function determineReadStream(input) {
    if (!input) {
        return process.stdin;
    }

    if (!fs.existsSync(input)) {
        process.stderr.write('input file doesn`t exist\n');
        return null;
    }

    try {
        fs.accessSync(input, fs.constants.R_OK);
    } catch (err) {
        process.stderr.write('no permission to read input file\n');
        return null;
    }

    if (fs.statSync(input).isDirectory()) {
        process.stderr.write('can`t read folder\n');
        return null;
    }
    
    if (path.extname(input) !== '.txt') {
        process.stderr.write('input file should have .txt extension\n');
        return null;
    }

    return fs.createReadStream(input);
}

function determineWriteStream(output) {
    if (!output) {
        return process.stdout;
    }

    if (!fs.existsSync(output)) {
        process.stderr.write('output file doesn`t exist\n');
        return null;
    }

    try {
        fs.accessSync(output, fs.constants.W_OK);
    } catch (err) {
        process.stderr.write('no permission to write to output file\n');
        return null;
    }

    if (fs.statSync(output).isDirectory()) {
        process.stderr.write('can`t write to folder\n');
        return null;
    }

    if (path.extname(output) !== '.txt') {
        process.stderr.write('output file should have .txt extension\n');
        return null;
    }

    return fs.createWriteStream(output, {
        flags: 'a'
    });
}

function createTransformStream(shift, action) {
    return new stream.Transform({
        transform(chunk, encoding, callback) {
            const chunkStr = chunk.toString();
            this.push(caesarCipher(chunkStr, action === 'encode' ? shift : shift * -1) + '\n');
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

    // debugger
    // console.log(input, `shift: ${shift}`);

    // 1) input -> inputArr
    for (char of input) {
        isLetter = utils.checkAlphabetRange(char);
        inputArr.push(isLetter ? char.charCodeAt() : char);
    }

    // debugger
    // console.log(inputArr);

    // 2) inputArr -> outputArr
    for (value of inputArr) {
        if (typeof value === 'number') {
            outputArr.push(utils.encryptLetter(value, shift));
        } else {
            outputArr.push(value);
        }
    }

    // debugger
    // console.log(outputArr);

    //  3) outputArr -> output
    outputArr.forEach((value) => {
        if (typeof value === 'number') {
            output += String.fromCharCode(value);
        } else {
            output += value;
        }
    })

    // debugger
    // console.log(output);

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