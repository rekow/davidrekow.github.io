/**
 * @file Application handlers.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
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
  },

  // Application routes.
  '/': function (req, res) {
    res.status(200);
    res.set('Content-Type', 'text/html');
    this.render('index').pipe(res);
  }
};
