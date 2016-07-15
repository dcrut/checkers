/* eslint-disable no-unused-expressions, no-underscore-dangle, func-names, max-len */

const expect = require('chai').expect;
const sinon = require('sinon');
const Game = require('../../dst/models/game');

describe('Game', () => {
  beforeEach(() => {
    sinon.stub(Game, 'find').yields(null, []);
  });

  afterEach(() => {
    Game.find.restore();
  });

  describe('constructor', () => {
    it('should create a game object', (done) => {
      const d = new Game({ blackPlayer: '012345678901234567890011',
                           whitePlayer: '012345678901234567890012',
                           isFinished: false });
      d.validate(err => {
        expect(err).to.be.undefined;
        expect(d.isFinished).to.equal(false);
        expect(d._id).to.be.ok;
        expect(d.dateCreated).to.be.ok;
        done();
      });
    });

    it('should NOT create a game object - Missing a player', (done) => {
      const d = new Game({ blackPlayer: '012345678901234567890011',
                           isFinished: false });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
  });


  describe('#movePiece', () => {
    const testGame = new Game({ blackPlayer: '012345678901234567890011',
      whitePlayer: '012345678901234567890012',
      isFinished: false });
    testGame.setInitialBoard();
    it('should NOT move a piece - not enough arguments', () => {
      const result = testGame.movePiece({ origin: [4, 2], target: [5, 3] });
      expect(result.message).to.equal('movePiece() does not have enough arguments');
    });
    it('should NOT move a piece - one empty argument', () => {
      const result = testGame.movePiece({ player: '', origin: [4, 2], target: [5, 3] });
      expect(result.message).to.equal('movePiece() does not have enough arguments');
    });
    it('should move a piece - moving to an empty square on a diagonal', () => {
      const result = testGame.movePiece({ player: testGame.blackPlayer, origin: [5, 5], target: [4, 6] });
      expect(result).to.deep.equal([4, 6]);
    });
    it('should NOT move a piece - target is occupied', () => {
      const result = testGame.movePiece({ player: testGame.blackPlayer, origin: [6, 2], target: [5, 3] });
      expect(result).to.deep.equal([6, 2]);
    });
  });


  describe('#isMoveLegal', () => {
    const testGame = new Game({ blackPlayer: '012345678901234567890011',
      whitePlayer: '012345678901234567890012',
      isFinished: false });
    testGame.setInitialBoard();
    it('is legal - target is open', () => {
      const result = testGame.isMoveLegal({ player: testGame.blackPlayer, origin: [5, 1], target: [4, 2] });
      expect(result).to.equal(true);
    });
    it('is NOT legal - target does not exist', () => {
      const result = testGame.isMoveLegal({ player: testGame.blackPlayer, origin: [5, 7], target: [4, 8] });
      expect(result).to.equal(false);
    });
    it('is NOT legal - target does not exist', () => {
      const result = testGame.isMoveLegal({ player: testGame.blackPlayer, origin: [6, 0], target: [7, -1] });
      expect(result).to.equal(false);
    });
    it('is NOT legal - target is too far away', () => {
      const result = testGame.isMoveLegal({ player: testGame.blackPlayer, origin: [6, 0], target: [4, 2] });
      expect(result).to.equal(false);
    });
    it('is NOT legal - target on a horizontal', () => {
      const result = testGame.isMoveLegal({ player: testGame.blackPlayer, origin: [5, 3], target: [5, 4] });
      expect(result).to.equal(false);
    });
    it('is NOT legal - target on a vertical', () => {
      const result = testGame.isMoveLegal({ player: testGame.whitePlayer, origin: [0, 2], target: [1, 2] });
      expect(result).to.equal(false);
    });
    it('is NOT legal - target is occupied', () => {
      const result = testGame.isMoveLegal({ player: testGame.whitePlayer, origin: [0, 2], target: [1, 3] });
      expect(result).to.equal(false);
    });
  });

  describe('#isPiecePresent', () => {
    const testGame = new Game({ blackPlayer: '012345678901234567890011',
      whitePlayer: '012345678901234567890012',
      isFinished: false });
    testGame.setInitialBoard();
    it('cannot detect if piece is present- not enough arguments', () => {
      const result = testGame.isPiecePresent();
      expect(result.message).to.equal('isPiecePresent() does not have enough arguments');
    });
    it('cannot detect if piece is present - one empty argument', () => {
      const result = testGame.isPiecePresent([]);
      expect(result.message).to.equal('isPiecePresent() does not have enough arguments');
    });
    it('detects when a piece is not present on the initial board', () => {
      const result = testGame.isPiecePresent([0, 1]);
      expect(result.message).to.equal('piece is not present at origin');
    });
    it('detects when a piece is present on the initial board', () => {
      const result = testGame.isPiecePresent([7, 1]);
      expect(result).to.equal(true);
    });
  });

  describe('#pieceBelongsToPlayer', () => {
    const testGame = new Game({ blackPlayer: '012345678901234567890011',
      whitePlayer: '012345678901234567890012',
      isFinished: false });
    testGame.setInitialBoard();
    it('cannot check if piece belongs to player - not enough arguments', () => {
      const result = testGame.pieceBelongsToPlayer();
      expect(result.message).to.equal('pieceBelongsToPlayer() does not have enough arguments');
    });
    it('cannot check if piece belongs to player - one empty argument', () => {
      const result = testGame.pieceBelongsToPlayer({ player: testGame.blackPlayer, origin: [] });
      expect(result.message).to.equal('pieceBelongsToPlayer() does not have enough arguments');
    });
    it('cannot check if piece belongs to player - player is not currently playing', () => {
      const result = testGame.pieceBelongsToPlayer({ player: '123456789', origin: [2, 0] });
      expect(result.message).to.equal('Sorry, that player is not currently playing');
    });
    it('detects piece does NOT belong to player on the initial board', () => {
      const result = testGame.pieceBelongsToPlayer({
        player: testGame.blackPlayer,
        origin: [2, 0] });
      expect(result).to.equal(false);
    });
    it('detects piece belongs to player on the initial board', () => {
      const result = testGame.pieceBelongsToPlayer({
        player: testGame.whitePlayer,
        origin: [2, 4] });
      expect(result).to.equal(true);
    });
  });

  describe('#setInitialBoard', () => {
    const d = new Game({ blackPlayer: '012345678901234567890011',
    whitePlayer: '012345678901234567890012',
    isFinished: false });
    d.setInitialBoard();
    it('should initialize an 8x8 board', (done) => {
      d.validate(err => {
        expect(err).to.be.undefined;
        expect(d.board.length).to.equal(8);
        expect(d.board[0].length).to.equal(8);
        done();
      });
    });
    it('should initialize an 8x8 board with pieces positioned correctly for a new game', (done) => {
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
      d.validate(err => {
        expect(err).to.be.undefined;
        expect(d.board.toObject()).to.eql(g);
        done();
      });
    });
  });
});
