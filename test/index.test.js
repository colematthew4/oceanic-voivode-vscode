'use strict';

const { fail } = require("assert");
const { suite, describe, it } = require("mocha");

suite('potato', () => {
  describe('will', () => {
    it('pass', () => {
      console.log('PASS')
    })
    it('fail', () => {
      fail()
    })
    it('error', Error)
    it.skip('skip')
  })
})
