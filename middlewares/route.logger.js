const logger = require('../logger')

const routeLogger = function (req, res, next) {
  const route = `${req.baseUrl}${req.path}`
  logger.info(`${route} - error message`)
  next();
};

module.exports = {
  routeLogger,
};
