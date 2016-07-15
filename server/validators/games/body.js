/* eslint-disable no-param-reassign */

import joi from 'joi';

const schema = {
  blackPlayer: joi.string().required(),
  whitePlayer: joi.string().required(),
  board: joi.array(),
  isFinished: joi.boolean(),
};

module.exports = (req, res, next) => {
  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send({ messages: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    next();
  }
};
