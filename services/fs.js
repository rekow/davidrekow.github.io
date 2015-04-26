/**
 * Filesystem service.
 */

var fs = require('fs');

module.exports = {
  read: function (path, res, mime) {
    var file = fs.createReadStream(path);

    file.on('open', function () {
      res.set('Content-Type', mime || 'text/plain');
      file.pipe(res);
    });

    file.on('error', function (err) {
      res.end(err);
    });
  }
};
