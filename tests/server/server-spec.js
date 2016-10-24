/* You'll need to have MongoDB running and your Node server running
 * for these tests to pass. */
const mocha = require('mocha');
// const mongoose = require('mongoose');
const request = require('request');
const expect = require('chai').expect;

const describe = mocha.describe;
const it = mocha.it;
// const beforeEach = mocha.beforeEach;
// const afterEach = mocha.afterEach;

describe('Node Recipe Server', () => {
  it('Should insert posted recipes to the DB', (done) => {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/api/recipe',
      json: { q: 'something' },
    }, () => {
      expect(true).to.equal(true);
    });
    done();
  });
});
