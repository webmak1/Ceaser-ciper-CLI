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
} = require('./functions');

// const sourceFile = `${__dirname}/source.txt`;
// const distFile = `${__dirname}/dist.txt`;

program
    .description('simple Ceaser cipher CLI tool')
    .option('-s, --shift <value>', 'a shift of cipher')
    .option('-i, --input <source>', 'input file or stdin')
    .option('-o, --output <dist>', 'output file or stdout')
    .option('-a, --action <type>', 'encode or decode')

program.parse();


let options = program.opts();

const isShiftSpecified = checkShift(options.shift);
const isActionSpecified = checkAction(options.action);

if (!isShiftSpecified) process.stderr.write('shift option doesn`t speciified or has wrong value\n');
if (!isActionSpecified) process.stderr.write('action option doesn`t speciified or has wrong value\n')
if (!isShiftSpecified || !isActionSpecified) process.exit(1);

const readStream = determineReadStream(options.input);
const writeStream = determineWriteStream(options.output);
const transformStream = createTransformStream(options.shift, options.action);

if (readStream == process.stdin) {
    console.log('please enter input message');
    console.log('to exit app enter CTRL + C');
}

if (readStream && writeStream) {
    readStream.pipe(transformStream).pipe(writeStream)
} else {
    process.exit(1)
};