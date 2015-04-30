/**
 * @file App server configuration.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
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
