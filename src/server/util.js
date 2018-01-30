const USER_ERROR = 422;

const errorHandler = (error, req, res, next, message) => {
  message = message || 'Oops! Looks like that doesn\'t work :(';
  res.status(USER_ERROR).send({error, message});
};

const asyncMiddleware = cb =>
  (req, res, next) =>
    Promise.resolve(cb(req, res, next)).catch(error => errorHandler(error, req, res, next));

module.exports = {
  USER_ERROR,
  errorHandler,
  asyncMiddleware
};
