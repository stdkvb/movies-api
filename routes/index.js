const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const { checkAuth } = require('../middlewares/auth');
const { PATCH_NOT_FOUND } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');

router.use('/', authRouter);
router.use(checkAuth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use('*', (request, response, next) => {
  next(new NotFoundError(PATCH_NOT_FOUND));
});

module.exports = router;
