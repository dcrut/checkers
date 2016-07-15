/* eslint-disable no-use-before-define */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3 },
  email: { type: String,
           required: true,
           validate: { validator: notNumValidator } },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

function notNumValidator(email) {
  return isNaN(Number(email));
}

module.exports = mongoose.model('User', userSchema);
