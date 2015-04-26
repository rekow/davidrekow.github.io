/**
 * Analytics service.
 */

var gcloud = require('gcloud')({
  projectId: process.env.GAE_LONG_APP_ID || process.env.DATASET_ID,
  credentials: require('../key.json'),
  namespace: 'analytics'
}),
  ds = gcloud.datastore.dataset();

module.exports = function (event, res) {
  ds.save({
    key: ds.key('Event'),
    data: event
  }, function (err) {
    if (err)
      console.log('Error tracking event', err);
  });
};
