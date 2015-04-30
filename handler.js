/**
 * @file Base handler context.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

var context = {
  fs: require('./services/fs'),
  ok: require('./services/ok'),
  track: require('./services/track'),
  render: require('./services/render')
};

module.exports = function (handler) {
  return handler.bind(context);
};
