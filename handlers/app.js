/**
 * Application handlers.
 */

module.exports = {
  // Appengine admin routes.
  '/_ah/health': function (req, res) {
    this.ok(req, res);
  },
  '/_ah/start': function (req, res) {
    this.ok(req, res);
  },
  '/_ah/stop': function (req, res) {
    this.ok(req, res);
    process.exit();
  }
};
