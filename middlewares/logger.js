const expressWinston = require('express-winston');
const { format, transports } = require('winston');
const path = require('path');

const jsonFormat = format.combine(
  format.timestamp(),
  format.json()
);

const requestLogger = expressWinston.logger({
  transports: [
    new transports.File({ filename: path.join('logs', 'request.log') }),
  ],
  format: jsonFormat,
  meta: true,
  msg: '{{req.method}} {{req.url}}',
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({ filename: path.join('logs', 'error.log') }),
  ],
  format: jsonFormat,
});

module.exports = {
  requestLogger,
  errorLogger,
};