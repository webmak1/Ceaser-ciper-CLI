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

const {
    checkAlphabetRange,
    encryptLetter
} = require('./../utils');

describe('main', () => {

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
    })

})

describe('utils', () => {
    describe('checkAlphabetRange', () => {

        it('works correctly with lowercase letter', () => {
            assert.strictEqual(checkAlphabetRange('a'), true);
            assert.strictEqual(checkAlphabetRange('c'), true);
            assert.strictEqual(checkAlphabetRange('z'), true);
        })

        it('works correctly with uppercase letter', () => {
            assert.strictEqual(checkAlphabetRange('A'), true);
            assert.strictEqual(checkAlphabetRange('C'), true);
            assert.strictEqual(checkAlphabetRange('Z'), true);
        })

        it('works correctly with non-letter values', () => {
            assert.strictEqual(checkAlphabetRange('1'), false);
            assert.strictEqual(checkAlphabetRange(' '), false);
            assert.strictEqual(checkAlphabetRange(','), false);
            assert.strictEqual(checkAlphabetRange('%'), false);
        })

        it('works correctly with empty string', () => {
            assert.strictEqual(checkAlphabetRange(''), false)
        })

    });

    describe('encryptLetter', () => {
        it('if non-number input arg -> throws error', () => {
            assert.throws(() => {
                encryptLetter('string')
            }, Error)

            assert.throws(() => {
                encryptLetter([])
            }, Error)

            assert.throws(() => {
                encryptLetter({})
            }, Error)
        });

        it('works with positive values lower then 26', () => {

        });
    })
})