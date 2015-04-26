/**
 * Base handler context.
 */

var context = {
  track: require('./services/track'),
  fs: require('./services/fs')
};

module.exports = function (handler) {
  return handler.bind(context);
};
