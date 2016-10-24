/* You'll need to have MongoDB running and your Node server running
 * for these tests to pass. */
const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
// const db = require('../../server/config/connection.js');
const server = require('../../server/server.js');
const Recipe = require('../../db/models/recipeModel.js');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
// const afterEach = mocha.afterEach;

describe('Node Recipe Server', () => {
  const query = 'something';
  beforeEach((done) => {
    Recipe.remove({ q: query }).exec();

    done();
  });


  it('Should insert valid posted recipes to the DB', (done) => {
    request(server)
      .post('/api/recipe')
      .send({
        q: query,
      })
      .expect(200)
      .expect(() => {
        Recipe.find({ q: query })
          .exec((err, recipes) => {
            if (err) { console.err(err); }
            expect(recipes.length).to.equal(1);
            expect(recipes[0].q).to.equal(query);
          });
        // expect(1).to.equal(1);
      })
      .end(done);
  });
});
