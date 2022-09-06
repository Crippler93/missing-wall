const winston = require('winston');

const errorLog = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

const databaseLog = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'db.log', level: 'info' }),
  ],
});

exports.error = errorLog;
exports.db = databaseLog;
