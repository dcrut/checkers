/* eslint-disable no-unused-expressions, no-underscore-dangle */

const expect = require('chai').expect;
// const sinon = require('sinon');
const User = require('../../dst/models/user');

describe('User', () => {
  describe('constructor', () => {
    it('should create a User object', (done) => {
      const p = new User({ username: 'Bob',
                            email: 'bob@hotmail.com',
                            password: 'thx1138' });
      p.validate(err => {
        expect(err).to.be.undefined;
        expect(p.username).to.equal('Bob');
        expect(p.email).to.equal('bob@hotmail.com');
        expect(p.password).to.equal('thx1138');
        expect(p._id).to.be.ok;
        expect(p.dateCreated).to.be.ok;
        done();
      });
    });

    it('should NOT create a user object - no username', (done) => {
      const u = new User({ email: 'fiuo@yahoo.com',
                          password: 'fakepassword' });
      u.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a user object - username too short', (done) => {
      const u = new User({ username: 'b',
                          email: 'fiuo@yahoo.com',
                          password: '312' });
      u.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should NOT create a user object - email is a number', (done) => {
      const u = new User({ username: 'bobby',
                          email: 22,
                          password: '312' });
      u.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
  });
});
