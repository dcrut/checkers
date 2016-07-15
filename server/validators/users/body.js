/* eslint-disable no-param-reassign */

import joi from 'joi';

const schema = {
  username: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
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
