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
  const q = 'something';
  const label = 'bananananananna';
  const ingredients = [{
    food: 'apple',
    quantity: 1,
    measure: 'g',
    weight: 1234,
  }];
  const calories = 1234;

  beforeEach((done) => {
    Recipe.remove({ q }).exec();

    done();
  });

  describe('Recipe creation: ', () => {
    it('Only adds valid recipes db, return 404 for invalid recipes', (done) => {
      request(server)
        .post('/api/recipe')
        .send({ q })
        .expect(404)
        .expect(() => {
          Recipe.find({ q })
            .exec((err, recipes) => {
              if (err) { console.err(err); }
              expect(recipes.length).to.equal(0);
            });
        })
        .end(done);
    });

    it('Should insert valid posted recipes to the DB', (done) => {
      request(server)
        .post('/api/recipe')
        .send({ q, label, ingredients, calories })
        .expect(200)
        .expect(() => {
          Recipe.find({ q })
            .exec((err, recipes) => {
              if (err) { console.err(err); }
              expect(recipes.length).to.equal(1);
              expect(recipes[0].q).to.equal(q);
            });
        })
        .end(done);
    });

    it('Should return an instance of the new recipe', (done) => {
      const newRecipe = { q, label, ingredients, calories };
      request(server)
        .post('/api/recipe')
        .send(newRecipe)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.include.keys('q', 'label', 'ingredients', 'calories');
        })
        .end(done);
    });
  });
});
