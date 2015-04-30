/**
 * @file 'ok' service.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

module.exports = function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
};