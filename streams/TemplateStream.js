/**
 * @file Stream for managing template retrieval.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

var path = require('path'),
  streams = require('./'),
  t = require_asset('js', 'lib/t'),
  TEMPLATE_ROOT = path.resolve(__dirname, '../views'),
  TemplateStream;

TemplateStream = streams.transform({
  construct: function (name, raw) {
    this._name = name;
    this._source = '';
    this._raw = !!raw;
  },

  transform: function (chunk, enc, cb) {
    if (Buffer.isBuffer(chunk))
      this._source += chunk.toString();

    cb();
  },

  flush: function (cb) {
    var template;

    if (this._source)
      t.put(this._name, this._source);

    template = t.load(this._name);
    this.push(this._raw ? template.t : template);
    cb();
  }
});

TemplateStream.getPath = function (name) {
  return path.join(TEMPLATE_ROOT, name + '.html');
};

module.exports = TemplateStream;
