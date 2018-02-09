const USER_ERROR = 422;

const errorHandler = (error, req, res, next, message) => {
  message = message || 'Oops! Looks like that doesn\'t work :(';
  console.log(error);
  res.status(USER_ERROR).send({error, message});
};

const asyncMiddleware = cb =>
  (req, res, next) =>
    Promise.resolve(cb(req, res, next)).catch(error => errorHandler(error, req, res, next));

let frontServerIP = '';
let apiServerIP   = '';
let authServerIP  = '';
let dbServerIP    = '';
if (!process.env.PRODUCTION) {
  frontServerIP = 'http://localhost.test:3000/';
  apiServerIP   = 'http://api.localhost.test:3001/';
  authServerIP  = 'http://auth.localhost.test:3002/';
  dbServerIP    = 'http://db.localhost.test:3003/';
} else {
  frontServerIP = 'http://leveld.com:3000/';
  apiServerIP   = 'http://api.leveld.com:3001/';
  authServerIP  = 'http://auth.leveld.com:3002/';
  dbServerIP    = 'http://db.leveld.com:3003/';
}

module.exports = {
  USER_ERROR,
  errorHandler,
  asyncMiddleware,
  frontServerIP,
  apiServerIP,
  authServerIP,
  dbServerIP,
  ...require('./secret.json')
};