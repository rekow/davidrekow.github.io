/**
 * @file API Handlers.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

var template = require('../services/template');

module.exports = {
  '/template/:view': function (req, res) {
    var view = req.params.view;

    console.log('::::::::::::::::::::::APPENGINE REQUEST OBJECT');
    console.log('%j', req.appengine || {});

    this.track('APIRequest', {
      now: +(new Date()),
      service: 'template',
      ip: req.ip,
      resource: view
    }, res);

    res.set('Content-Type', 'text/plain');
    template(view, true).pipe(res);
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
      this.ok(req, res);
    },
    post: function (req, res) {
      this.track(req.body.event, req.body.data, res);
      this.ok(req, res);
    }
  }
};
