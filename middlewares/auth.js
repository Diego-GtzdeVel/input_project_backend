if (process.env.NODE_ENV === 'production') {
  require('dotenv').config();
}

const jwt = require('jsonwebtoken');

const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED_CODE)
      .send({ message: 'Authentication required. No token was passed.' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res
      .status(FORBIDDEN_CODE)
      .send({ message: 'Access denied. Invalid token.' });
  }
};
