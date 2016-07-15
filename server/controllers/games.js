/* eslint-disable new-cap */

import express from 'express';
import Game from '../models/game';
const router = module.exports = express.Router();
import bodyValidator from '../validators/games/body';

// create
router.post('/', bodyValidator, (req, res) => {
  Game.create(res.locals, (err, game) => {
    game.setInitialBoard();
    res.send({ game });
  });
});
