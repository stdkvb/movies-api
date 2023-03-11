const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  MOVIE_CREATE_INCORRECT_DATA,
  MOVIE_NOT_FOUND,
  MOVIE_ACCESS_DENIED,
  MOVIE_DELETE_INCORRECT_DATA,
  MOVIE_SUCCESS_REMOVE,
} = require('../utils/constants');

const getMovies = (request, response, next) => {
  Movie.find({})
    .then((movies) => response.send(movies))
    .catch(next);
};

// Создаёт фильм.
const createMovie = (request, response, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = request.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: request.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => response.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(MOVIE_CREATE_INCORRECT_DATA));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (request, response, next) => {
  const { movieId } = request.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      } else if (request.user._id.toString() !== movie.owner.toString()) {
        throw new ForbiddenError(MOVIE_ACCESS_DENIED);
      } else {
        Movie.findByIdAndRemove(movieId)
          .then(() => {
            response.send({ message: MOVIE_SUCCESS_REMOVE });
          })
          .catch(next);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError(MOVIE_DELETE_INCORRECT_DATA));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
