// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var appengine = require('appengine');
var express = require('express');
var bodyparser = require('body-parser');
var templates = require('./templates');
var track = require('./data').track;
var fs = require('fs');

var app = express();
var api = express();

app.use(appengine.middleware.base);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.enable('trust proxy');

api.get('/template/:view', function (req, res) {
  track('template', req.ip, req.path, res);
  res.set('Content-Type', 'text/plain');
  templates.get(req.params.view, res);
});

app.use('/api', api);

app.get('/', function (req, res) {
  track('hit', req.ip, req.path, res);
  res.set('Content-Type', 'text/html');
  var stream = fs.createReadStream('./static/index.html');
  stream.on('open', function () {
    res.send(200);
    stream.pipe(res);
  });
  stream.on('error', function (err) {
    res.end(err);
  });
});

app.get('/_ah/health', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
});

app.get('/_ah/start', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
});

app.get('/_ah/stop', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(200, 'ok');
  process.exit();
});

app.get('/hello', function(req, res) {
  var env = req.appengine.devappserver ? 'the dev appserver' : 'production';
  res.send('Hello, world from ' + env + '!');
});

app.listen(8080, '0.0.0.0');
console.log('Listening on port 8080');