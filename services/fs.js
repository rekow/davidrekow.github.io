/**
 * @file Filesystem service.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

var fs = require('fs');

module.exports = {
  read: function (path, stream) {
    var file = fs.createReadStream(path);

    file.on('error', function (err) {
      stream.end(err);
    });

    file.on('open', function () {
      file.pipe(stream);
    });
  },

  readSync: function (path) {
    try {
      return fs.readFileSync(path, 'utf8');
    } catch (e) {
      return fs.readFileSync('/app/views/static/404.html', 'utf8');
    }
  }
};
