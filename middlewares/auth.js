const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { TOKEN_NOT_FOUND } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-error');

const checkAuth = (request, response, next) => {
  const cookie = request.cookies.access_token;
  if (!cookie) {
    throw new UnauthorizedError(TOKEN_NOT_FOUND);
  }

  const token = cookie.replace('access_token', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError(TOKEN_NOT_FOUND);
  }

  request.user = payload;

  next();
};

module.exports = {
  checkAuth,
};
