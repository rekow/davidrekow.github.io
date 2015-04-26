var projectId = process.env.GAE_LONG_APP_ID || process.env.DATASET_ID;

if (!projectId) {
  var MISSING_ID = [
    'Cannot find your project ID. Please set an environment variable named ',
    '"DATASET_ID", holding the ID of your project.'
  ].join('');
  throw new Error(MISSING_ID);
}

var gcloud = require('gcloud')({
  projectId: projectId,
  credentials: require('./key.json'),
  namespace: 'analytics'
});

var ds = gcloud.datastore.dataset();

module.exports = {
  track: function (event, ip, from, res) {
    var key = ds.key('Event');

    ds.save({
      key: key,
      data: {
        now: +(new Date()),
        event: event,
        ip: ip,
        resource: from
      }
    }, function (err) {
      if (err && !key.id) {
        console.log('Error tracking event', err);
      }
    });
  }
};