/**
 * @file Template service.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

var fs = require('./fs'),
  t = require('../static/js/lib/t.js'),
  TemplateStream = require('../streams/TemplateStream'),

  cache = {};

t.config({
  load: function (name, cb) {
    var result, count;

    if (Array.isArray(name)) {
      result = {};
      count = name.length;

      name.forEach(function (name) {
        if (cache[name]) {
          result[name] = cache[name];
          return --count || (cb && cb(result));
        }

        if (cb) {
          return fs.read(TemplateStream.getPath(name),
            new TemplateStream(name).on('finish', function () {
              result[name] = cache[name];
              return --count || cb(result);
            }));
        }

        result[name] = new t(fs.readSync(TemplateStream.getPath(name)));
      });
    } else {
      result = cache[name];

      if (result) {
        return cb ? cb(result) : result;
      }

      if (!cb) {
        t.put(name, fs.readSync(TemplateStream.getPath(name)));
        return cache[name];
      }

      return fs.read(TemplateStream.getPath(name),
        new TemplateStream(name).on('finish', function () {
          return cb(cache[name]);
        }));
    }
  },

  put: function (name, tpl, cb) {
    cache[name] = (tpl instanceof t ? tpl : new t(tpl));
  }
});

module.exports = function (name, raw) {
  var template = new TemplateStream(name, raw);

  t.load(name, function (tpl) {
    template.end(tpl);
  });

  return template;
};
