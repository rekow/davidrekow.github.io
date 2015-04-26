/**
 * Basic 'ok' handler.
 */

module.exports = function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
};