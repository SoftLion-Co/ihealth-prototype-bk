const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.simple() 
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: 'logfile.log' }) 
  ]
});

// logger.info('This is an information message.');
// logger.warn('This is a warning message.');
// logger.error('This is an error message.');

module.exports = logger;
