/**
 * Application handlers.
 */

var ok = function (res, req) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
};

module.exports = {
  // Appengine admin routes.
  '/_ah/health': ok,
  '/_ah/start': ok,
  '/_ah/stop': function (req, res) {
    ok(req, res);
    process.exit();
  }
};
