/**
 * App server configuration.
 */

var express = require('express'),
  appengine = require('appengine'),
  bodyparser = require('body-parser'),
  app = express();

app.use(appengine.middleware.base);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.enable('trust proxy');

module.exports = app;
