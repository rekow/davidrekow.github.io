/**
 * API Handlers.
 */

module.exports = {
  '/template/:view', function (res, req) {
    var view = req.params.view;

    this.track({
      now: +(new Date()),
      event: 'template',
      ip: ip,
      resource: view
    }, res);

    this.fs.read('./views/' + view + '.html', res);
  }
};
