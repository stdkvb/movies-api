const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  USER_UPDATE_NOT_FOUND,
  USER_UPDATE_INCORRECT_DATA,
  EMAIL_ALREADY_EXISTS,
  USER_CREATE_INCORRECT_DATA,
  INCORRECT_AUTH_DATA, USER_SUCCESS_AUTH, USER_SUCCESS_EXIT,
} = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

// Создание пользователя.
const createUser = (request, response, next) => {
  const { name, email, password } = request.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then(() => {
          response.status(201).send({ email, name });
        })
        .catch((error) => {
          if (error.name === 'ValidationError') {
            next(new BadRequestError(USER_CREATE_INCORRECT_DATA));
          } else if (error.code === 11000) {
            next(new ConflictError(EMAIL_ALREADY_EXISTS));
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

// Авторизация пользователя.
const loginUser = (request, response, next) => {
  const { email, password } = request.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(INCORRECT_AUTH_DATA);
      }

      return bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) {
            throw new UnauthorizedError(INCORRECT_AUTH_DATA);
          }

          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          response.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          });

          return response.send({
            message: USER_SUCCESS_AUTH,
          });
        });
    })
    .catch(next);
};

const logoutUser = (request, response) => {
  response.clearCookie('access_token', {
    httpOnly: true,
    sameSite: true,
  }).send({
    message: USER_SUCCESS_EXIT,
  });
};

// Получение информации текущего пользователя.
const getUserInfo = (request, response, next) => {
  User.findById(request.user._id)
    .then((user) => {
      response.send(user);
    })
    .catch(next);
};

// Обновление информации о пользователе.
const updateUser = (request, response, next) => {
  const { email, name } = request.body;

  User.findByIdAndUpdate(request.user._id, { email, name }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_UPDATE_NOT_FOUND);
      }
      response.send({
        _id: user._id,
        email,
        name,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(USER_UPDATE_INCORRECT_DATA));
      } else if (error.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createUser,
  getUserInfo,
  updateUser,
  loginUser,
  logoutUser,
};
