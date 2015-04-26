/**
 * API Handlers.
 */

module.exports = {
  '/template/:view': function (req, res) {
    var view = req.params.view;

    this.track({
      now: +(new Date()),
      event: 'template',
      ip: req.ip,
      resource: view
    }, res);

    this.fs.read('./views/' + view + '.html', res);
  }
};
