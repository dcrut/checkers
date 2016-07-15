/* eslint-disable no-unused-expressions, no-underscore-dangle, no-unused-vars */

const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const Game = require('../../dst/models/game');
const User = require('../../dst/models/user');
const app = require('../../dst/server');
const cp = require('child_process');

describe('games', () => {
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      done();
    });
  });

  describe('post /games', () => {
    const g = [
      ['1', '0', '1', '0', '1', '0', '1', '0'],
      ['0', '1', '0', '1', '0', '1', '0', '1'],
      ['1', '0', '1', '0', '1', '0', '1', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '2', '0', '2', '0', '2', '0', '2'],
      ['2', '0', '2', '0', '2', '0', '2', '0'],
      ['0', '2', '0', '2', '0', '2', '0', '2'],
    ];
    it('should start a new game', (done) => {
      request(app)
      .post('/games')
      .send({ blackPlayer: '012345678901234567890011', whitePlayer: '012345678901234567890012' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.game.blackPlayer).to.equal('012345678901234567890011');
        expect(rsp.body.game.whitePlayer).to.equal('012345678901234567890012');
        expect(rsp.body.game.board).to.deep.equal(g);
        expect(rsp.body.game.isFinished).to.equal(false);
        expect(rsp.body.game.__v).to.not.be.null;
        expect(rsp.body.game._id).to.not.be.null;
        done();
      });
    });
  });
});
