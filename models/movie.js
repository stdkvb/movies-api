const mongoose = require('mongoose');
const validator = require('validator');
const { URL_MESSAGE_ERROR } = require('../utils/constants');

const movieScheme = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (link) => validator.isURL(link),
        message: URL_MESSAGE_ERROR,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (link) => validator.isURL(link),
        message: URL_MESSAGE_ERROR,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (link) => validator.isURL(link),
        message: URL_MESSAGE_ERROR,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('movie', movieScheme);
