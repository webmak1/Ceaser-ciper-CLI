const fs = require('fs');
const stream = require('stream');
const {
    program
} = require('commander');

const {
    checkShift,
    checkAction,
    determineReadStream,
    determineWriteStream,
    createTransformStream,

    caesarCipher
} = require('./functions')

const sourceFile = `${__dirname}/source.txt`;
const distFile = `${__dirname}/dist.txt`;

program
    .description('simple Ceaser cipher CLI tool')
    .option('-s, --shift <value>', 'a shift of cipher')
    .option('-i, --input <source>', 'input file or stdin')
    .option('-o, --output <dist>', 'output file or stdout')
    .option('-a, --action <type>', 'encode or decode', 'encode')

program.parse();


let options = program.opts();

// checkShift(options.shift);
// checkAction(options.action);

// const readStream = determineReadStream();
// const writeStream = determineWriteStream();
// const transformStream = createTransformStream(5, 'encode');

const output = caesarCipher('abc', 30);

// readStream.pipe(transformStream).pipe(writeStream);