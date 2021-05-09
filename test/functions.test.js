const assert = require('assert');
const fs = require('fs');
const stream = require('stream');

const {
    checkShift,
    checkAction,
    determineReadStream,
    determineWriteStream,
    createTransformStream,
    caesarCipher
} = require('./../functions');

describe('functions', () => {

    describe('checkShift', () => {
        it('if --shift not defined -> throw error', () => {
            assert.throws(() => {
                checkShift(undefined)
            }, Error)
        });
    })

    describe('checkAction', () => {
        it('if --action not defined -> throw error', () => {
            assert.throws(() => {
                checkAction(undefined)
            }, Error)
        });
    })

    describe('determineReadStream', () => {
        it('if input undefined -> return stdin', () => {
            assert.equal(determineReadStream(undefined), process.stdin)
        });

        it('if input correct -> return fs.ReadStream', () => {
            assert.ok(determineReadStream('./test/testFile.txt') instanceof fs.ReadStream)
        });

        it('if input file doesn`t exist -> return null', () => {
            assert.ok(determineReadStream('./test/unexistingFile') === null)
        });

        it('if input file is folder -> return null', () => {
            assert.ok(determineReadStream('./test/testFolder') === null)
        });

        // 
        // it('if has no access to file -> return null', () => {
        //     assert.ok(determineReadStream('./test/noReadAccessFile') === null)
        // });
    })

    describe('determineWriteStream', () => {
        it('if output undefined -> return stdout', () => {
            assert.equal(determineWriteStream(undefined), process.stdout)
        });

        it('if output correct -> return fs.WriteStream', () => {
            assert.ok(determineWriteStream('./test/testFile.txt') instanceof fs.WriteStream)
        });

        it('if output file doesn`t exist -> return null', () => {
            assert.ok(determineWriteStream('./test/unexistingFile') === null)
        });

        it('if output file is folder -> return null', () => {
            assert.ok(determineWriteStream('./test/testFolder') === null)
        });

        it('if has no access to file -> return null', () => {
            assert.ok(determineWriteStream('./test/noWriteAccessFile') === null)
        });
    })

    describe('createTransformStream', () => {
        it('returns stream.Transform instance', () => {
            assert.ok(createTransformStream() instanceof stream.Transform);
        });
    })

    describe('ceaserCipher', () => {

        it('if input non-string -> throw Error', () => {
            assert.throws(() => {
                caesarCipher(123)
            }, Error);
        });

        it('positive shift', () => {
            assert.strictEqual(caesarCipher('This is secret. Message about "_" symbol!', 7), 'Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!');
        });

        it('negative shift', () => {
            assert.strictEqual(caesarCipher('Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!', -7), 'This is secret. Message about "_" symbol!');
        });

        it('negative shift handling', () => {
            assert.strictEqual(caesarCipher('This is secret. Message about "_" symbol!', -1), 'Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!');
        });

    });

});