/* eslint-disable new-cap */

import express from 'express';
import User from '../models/user';
const router = module.exports = express.Router();
import bodyValidator from '../validators/users/body';

// create
router.post('/', bodyValidator, (req, res) => {
  User.create(res.locals, (err, user) => {
    res.send({ user });
  });
});
