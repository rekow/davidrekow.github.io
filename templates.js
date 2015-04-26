/**
 * Template management.
 */

var fs = require('fs');

module.exports = {
  get: function (name, res) {
    var template = fs.createReadStream('./views/' + name + '.html');

    template.on('open', function () {
      template.pipe(res);
    });

    template.on('error', function (err) {
      template.end(err);
    });
  }
};
