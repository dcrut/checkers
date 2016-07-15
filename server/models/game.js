/* eslint-disable no-use-before-define, func-names, max-len, no-param-reassign */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  blackPlayer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  whitePlayer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  board: { type: Array },
  isFinished: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
});

const boardStateEnum = {
  EMPTY: '0',
  WHITE_PIECE: '1',
  BLACK_PIECE: '2',
  WHITE_PIECE_KINGED: '3',
  BLACK_PIECE_KINGED: '4',
};

gameSchema.methods.movePiece = function (args) {
  if ((!args.player || typeof args.player === 'undefined') || (!args.origin || typeof args.origin === 'undefined') || (!args.target || typeof args.target === 'undefined')) {
    return new Error('movePiece() does not have enough arguments');
  }
  const rowCoordOrigin = args.origin[0];
  const columnCoordOrigin = args.origin[1];
  const rowCoordTarget = args.target[0];
  const columnCoordTarget = args.target[1];
  const originStatus = this.board[rowCoordOrigin][columnCoordOrigin];
  if (this.isPiecePresent(args.origin) &&
      this.pieceBelongsToPlayer(args) &&
      this.isMoveLegal(args)) {
    this.board[rowCoordTarget][columnCoordTarget] = originStatus;
    this.board[rowCoordOrigin][columnCoordOrigin] = boardStateEnum.EMPTY;
    return args.target;
  }
  return args.origin;
};

gameSchema.methods.isMoveLegal = function (args) {
  const rowCoordOrigin = args.origin[0];
  const columnCoordOrigin = args.origin[1];
  const rowCoordTarget = args.target[0];
  const columnCoordTarget = args.target[1];
  const targetStatus = this.board[rowCoordTarget][columnCoordTarget];
  if (rowCoordTarget >= this.board.length || rowCoordTarget < 0) {
    return false;
  }
  if (columnCoordTarget >= this.board[0].length || columnCoordTarget < 0) {
    return false;
  }
  if (rowCoordTarget - rowCoordOrigin > 1) {
    return false;
  }
  if (columnCoordTarget - columnCoordOrigin > 1) {
    return false;
  }

  if (args.player === this.blackPlayer) {
    if (rowCoordOrigin - rowCoordTarget !== 1) {
      return false;
    }
    if (Math.abs(columnCoordTarget - columnCoordOrigin) !== 1) {
      return false;
    }
  }
  if (args.player === this.whitePlayer) {
    if (rowCoordTarget - rowCoordOrigin !== 1) {
      return false;
    }
    if (Math.abs(columnCoordTarget - columnCoordOrigin) !== 1) {
      return false;
    }
  }
  if (targetStatus === boardStateEnum.EMPTY) {
    return true;
  }
  return false;
};

gameSchema.methods.pieceBelongsToPlayer = function (args) {
  if ((!args || typeof args === 'undefined') || (!args.player || typeof args.player === 'undefined') || (!args.origin || typeof args.origin === 'undefined') || args.origin.length !== 2) {
    return new Error('pieceBelongsToPlayer() does not have enough arguments');
  }
  const rowCoordOrigin = args.origin[0];
  const columnCoordOrigin = args.origin[1];
  const originStatus = this.board[rowCoordOrigin][columnCoordOrigin];

  switch (args.player) {
    case this.blackPlayer:
      if (originStatus % 2 === 0) {
        return true;
      }
      return false;
    case this.whitePlayer:
      if (originStatus % 2 !== 0) {
        return true;
      }
      return false;
    default:
      return new Error('Sorry, that player is not currently playing');
  }
};

gameSchema.methods.isPiecePresent = function (origin) {
  if ((!origin || typeof origin === 'undefined') || origin.length !== 2) {
    return new Error('isPiecePresent() does not have enough arguments');
  }
  if (this.board[origin[0]][origin[1]] === boardStateEnum.EMPTY) {
    return new Error('piece is not present at origin');
  }
  return true;
};

gameSchema.methods.setInitialBoard = function () {
  this.board = [];
  this.board.push([
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
  ]);
  this.board.push([
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
  ]);
  this.board.push([
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.WHITE_PIECE,
    boardStateEnum.EMPTY,
  ]);
  this.board.push([
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
  ]);
  this.board.push([
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
    boardStateEnum.EMPTY,
  ]);
  this.board.push([
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
  ]);
  this.board.push([
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
  ]);
  this.board.push([
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
    boardStateEnum.EMPTY,
    boardStateEnum.BLACK_PIECE,
  ]);
};

module.exports = mongoose.model('Game', gameSchema);
