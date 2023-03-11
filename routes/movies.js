const router = require('express').Router();
const { createMovieValid, deleteMovieValid } = require('../middlewares/validation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// Возвращает все сохранённые пользователем фильмы.
router.get('/', getMovies);
router.post('/', createMovieValid, createMovie);
router.delete('/:movieId', deleteMovieValid, deleteMovie);

module.exports = router;
