/**
 * Route construction utility.
 */

var wrap_handler = require('./handler');

module.exports = function (server, routes) {
  var route, handler, method;

  for (route in routes) {
    handler = routes[route];
    if (typeof handler === 'function') {
      server.get(route, wrap_handler(handler));
    } else {
      for (method in handler) {
        server[method](route, wrap_handler(handler[method]));
      }
    }
  }
};
