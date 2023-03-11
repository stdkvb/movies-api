const mongoose = require('mongoose');
const validator = require('validator');
const { INCORRECT_EMAIL, MIN_LENGTH_ERROR, MAX_LENGTH_ERROR } = require('../utils/constants');

const userScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: INCORRECT_EMAIL,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: [2, MIN_LENGTH_ERROR],
      maxlength: [30, MAX_LENGTH_ERROR],
    },
  },
);

module.exports = mongoose.model('user', userScheme);
