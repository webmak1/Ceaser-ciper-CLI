const fs = require('fs');
const {
    program
} = require('commander');

const source = `${__dirname}/source.txt`;
const dist = `${__dirname}/dist.txt`;

program
    .description('simple Ceaser cipher CLI tool')
    .option('-s, --shift <value>', 'a shift of cipher')
    .option('-i, --input <source>', 'input file or stdin')
    .option('-o, --output <dist>', 'output file or stdout')
    .option('-a, --action <type>', 'encode or decode', 'encode')

program.parse();

const readStream = fs.createReadStream(source);
const writeStream = fs.createWriteStream(dist);

let options = program.opts();


function checkShift(shift) {
    if (shift) {
        console.log(shift);
    } else {
        console.log(shift);
        throw new Error('--shift did`t indicated');
    }
}

function checkAction(action) {
    if (action) {
        console.log(action);
    } else {
        console.log(action);
        throw new Error('--action did`t indicated');
    }
}

module.exports = {
    checkShift,
    checkAction
};