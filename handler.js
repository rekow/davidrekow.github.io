/**
 * Base handler context.
 */

var context = {
  track: require('./services/track'),
  fs: require('./services/fs'),
  ok: require('./services/ok')
};

module.exports = function (handler) {
  return handler.bind(context);
};
