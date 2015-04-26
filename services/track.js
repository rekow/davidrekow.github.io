/**
 * Analytics service.
 */

var gcloud = require('gcloud')({
  projectId: process.env.GAE_LONG_APP_ID || process.env.DATASET_ID,
  credentials: require('../key.json'),
  namespace: 'analytics'
}),
  ds = gcloud.datastore.dataset();

module.exports = function (kind, event, res) {
  if (!/^[A-Z]/.test(kind)) {
    kind = kind[0].toUpperCase() + kind.slice(1);
  }
  ds.save({
    key: ds.key(kind),
    data: event
  }, function (err) {
    if (err)
      res.end(err);
  });
};
