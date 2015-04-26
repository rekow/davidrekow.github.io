/**
 * API Handlers.
 */

var ok = require('./ok'),
  url = require('url');

module.exports = {
  '/template/:view': function (req, res) {
    var view = req.params.view;

    this.track('APIRequest', {
      now: +(new Date()),
      service: 'template',
      ip: req.ip,
      resource: view
    }, res);

    this.fs.read('./views/' + view + '.html', res);
  },

  '/track': {
    get: function (req, res) {
      try {
        data = JSON.parse(new Buffer(req.query.data || '', 'base64').toString('utf8'));
      } catch (e) {
        res.end(e);
      }

      data.ip = data.ip || req.ip;
      this.track(req.query.event, data, res);
      ok(req, res);
    },
    post: function (req, res) {
      this.track(req.body.event, req.body.data, res);
      ok(req, res);
    }
  }
};
