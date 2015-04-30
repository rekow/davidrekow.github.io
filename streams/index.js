/**
 * @file Core stream functionality.
 */

var stream = require('stream');

module.exports = {
  /**
   * Creates a Transform subclass using passed options.
   */
  transform: function (options) {
    var ctor = options.construct,
      ct = function () {
        stream.Transform.call(this, { objectMode: true });
        ctor.apply(this, arguments);
      };

    ct.prototype = Object.create(stream.Transform.prototype);

    ct.prototype.constructor = ct;
    ct.prototype._transform = options.transform;
    ct.prototype._flush = options.flush;

    return ct;
  }
};
