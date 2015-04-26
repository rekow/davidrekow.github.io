/**
 * Application handlers.
 */

var ok = require('./ok');

module.exports = {
  // Appengine admin routes.
  '/_ah/health': ok,
  '/_ah/start': ok,
  '/_ah/stop': function (req, res) {
    ok(req, res);
    process.exit();
  }
};
