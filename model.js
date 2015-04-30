/**
 * @file Base model class.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

var gcloud = require('gcloud')({
  projectId: process.env.GAE_LONG_APP_ID || process.env.DATASET_ID,
  credentials: require('./key.json')
}),
  datastore = gcloud.datastore.dataset(),
  Model;

Model = function (id) {
  this.key = ds.key({
    namespace: this.namespace || 'default',
    path: id ? [this.kind, id] : [this.kind]
  });

  this.data = {};
};

Model.create = function (ns, kind, ctor) {
  ctor = ctor || function (id) {
    Model.call(this, id);
  };

  ctor.prototype = Object.create(Model.prototype);
  ctor.prototype.constructor = ctor;
  ctor.prototype.namespace = ns;
  ctor.prototype.kind = kind;

  return ctor;
};

Model.prototype.set = function (data) {
  this.data = data;
};

Model.prototype.put = function (cb) {
  ds.save(this, cb);
};

Model.prototype.get = function (cb) {
  ds.get(this.key, function (err, entity) {
    if (!err) this.data = entity;
    cb && cb(err, entity);
  });
};

Model.prototype.del = function (cb) {
  ds['delete'](this.key, cb);
};

Model.prototype.namespace = '';
Model.prototype.kind = 'Model';

module.exports = Model;
