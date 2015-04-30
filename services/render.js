/**
 * @file Render service.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

var template = require('./template'),
  RenderStream = require('../streams/RenderStream');

module.exports = function (name, context) {
  return template(name).pipe(new RenderStream(context));
};
