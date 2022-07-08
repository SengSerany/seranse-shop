/**
 * It takes an error object, a request object, a response object, and a next function as arguments, and
 * returns a response object with a status code and a message
 * @param err - the error object
 * @param req - The request object.
 * @param res - the response object
 * @param next - This is a function that is called when the middleware is complete.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    /* Checking if the environment is production, if it is, it will return null, if not, it will
      return the stack. */
    stack: process.env.NODE_ENVIRONNEMENT === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
