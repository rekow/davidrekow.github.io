/**
 * @file Stream to manage template rendering.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 *
 * @TODO handle multi-template renders.
 */

var streams = require('./');

module.exports = streams.transform({
  construct: function (context) {
    this._context = context || {};
    this._template = null;
  },

  transform: function (template, enc, cb) {
    this._template = template;
    cb();
  },

  flush: function (cb) {
    this.push(this._template.render(this._context));
    cb();
  }
});
