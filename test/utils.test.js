const assert = require('assert');

const {
    checkAlphabetRange,
    encryptLetter
} = require('./../utils');


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

        describe('works with shift lower then alphabet range', () => {

            it('shift - positive, lowerCase', () => {
                assert.strictEqual(encryptLetter(97, 1), 98);
                // a -> b
                assert.strictEqual(encryptLetter(100, 0), 100);
                // d -> d
                assert.strictEqual(encryptLetter(99, 10), 109);
                // c -> m
                assert.strictEqual(encryptLetter(121, 1), 122);
                // y -> z
            });

            it('shift - positive, upperCase', () => {
                assert.strictEqual(encryptLetter(65, 1), 66);
                // A -> B
                assert.strictEqual(encryptLetter(103, 0), 103);
                // D -> D
                assert.strictEqual(encryptLetter(67, 10), 77);
                // C -> M
                assert.strictEqual(encryptLetter(89, 1), 90);
                // Y -> Z
            });

            it('shift - negative, lowerCase', () => {
                assert.strictEqual(encryptLetter(98, -1), 97);
                // b -> a
                assert.strictEqual(encryptLetter(100, 0), 100);
                // d -> d
                assert.strictEqual(encryptLetter(109, -10), 99);
                // m -> c
                assert.strictEqual(encryptLetter(122, -1), 121);
                // z -> y
            });

            it('shift - negative, upperCase', () => {
                assert.strictEqual(encryptLetter(66, -1), 65);
                // B -> A
                assert.strictEqual(encryptLetter(103, 0), 103);
                // D -> D
                assert.strictEqual(encryptLetter(77, -10), 67);
                // M -> C
                assert.strictEqual(encryptLetter(90, -1), 89);
                // Z -> Y
            });
        })

        describe('works with shift higher then alphabet range', () => {
            it('positive shift, lowerCase', () => {
                assert.strictEqual(encryptLetter(122, 1), 97);
                // z -> a
                assert.strictEqual(encryptLetter(121, 3), 98);
                // y -> b
                assert.strictEqual(encryptLetter(106, 23), 103);
                // j -> g
            });

            it('positive shift, upperCase', () => {
                assert.strictEqual(encryptLetter(90, 1), 65);
                // Z -> A
                assert.strictEqual(encryptLetter(89, 3), 66);
                // Y -> B
                assert.strictEqual(encryptLetter(74, 23), 71);
                // J -> G
            });

            it('negative shift, lowerCase', () => {
                assert.strictEqual(encryptLetter(97, -1), 122);
                // a -> z
                assert.strictEqual(encryptLetter(98, -3), 121);
                // b -> y
                assert.strictEqual(encryptLetter(103, -23), 106);
                // g -> j
            });

            it('negative shift, upperCase', () => {
                assert.strictEqual(encryptLetter(65, -1), 90);
                // A -> Z
                assert.strictEqual(encryptLetter(66, -3), 89);
                // B -> Y
                assert.strictEqual(encryptLetter(71, -23), 74);
                // G -> J
            });

        })

        describe('work with shift higher then 26', () => {
            
            it('shift positive, lowercase', () => {
                assert.strictEqual(encryptLetter(97, 26), 97);
                // a -> a
                assert.strictEqual(encryptLetter(97, 27), 98);
                // a -> b
                assert.strictEqual(encryptLetter(103, 28), 105);
                // j -> g
            });
            
            it('shift positive, uppercase', () => {
                assert.strictEqual(encryptLetter(65, 26), 65);
                // A -> A
                assert.strictEqual(encryptLetter(65, 27), 66);
                // A -> B
                assert.strictEqual(encryptLetter(74, 28), 76);
                // J -> G
            });

            it('shift negative, lowercase', () => {
                assert.strictEqual(encryptLetter(97, -26), 97);
                // a -> a
                assert.strictEqual(encryptLetter(98, -27), 97);
                // b -> a
                assert.strictEqual(encryptLetter(105, -28), 103);
                // g -> j
            });
            
            it('shift negative, uppercase', () => {
                assert.strictEqual(encryptLetter(65, -26), 65);
                // A -> A
                assert.strictEqual(encryptLetter(66, -27), 65);
                // B -> A
                assert.strictEqual(encryptLetter(76, -28), 74);
                // G -> J
            });

        })

    })
})