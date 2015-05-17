/**
 * @file Global dependency injectors.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */
var path = require('path');

// Requires a static asset. If loading javascript, expects a node-safe module.
global.require_asset = function (type, name, ext) {
  if (type === 'js') {
    return require(path.resolve(__dirname, process.env.assets_dir, type, name + '.' + (ext || type)));
  }
};
