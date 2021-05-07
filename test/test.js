const assert = require('assert');

const checkShift = require('./../index').checkShift;
const checkAction = require('./../index').checkAction;

describe('main', () => {

    it('throw error if --shift not defined', () => {
        assert.throws(() => {
            checkShift(undefined)
        }, Error)
    });

    it('throw error if --action not defined', () => {
        assert.throws(() => {
            checkAction(undefined)
        }, Error)
    });
})