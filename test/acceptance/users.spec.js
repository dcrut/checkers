/* eslint-disable no-unused-expressions, no-underscore-dangle, no-unused-vars */

const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const User = require('../../dst/models/user');
const app = require('../../dst/server');

describe('users', () => {
  beforeEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('post /users', () => {
    it('should create a new user', (done) => {
      request(app)
      .post('/users')
      .send({ username: 'Bob', email: 'bob@hotmail.com', password: 'thx1138' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.user.username).to.equal('Bob');
        expect(rsp.body.user.email).to.equal('bob@hotmail.com');
        expect(rsp.body.user.password).to.equal('thx1138');
        expect(rsp.body.user.__v).to.not.be.null;
        expect(rsp.body.user._id).to.not.be.null;
        done();
      });
    });
  });
});
