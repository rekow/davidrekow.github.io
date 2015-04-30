/**
 * @file Base application server.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

var app = require('./servers/app'),
  api = require('./servers/api'),
  appHandlers = require('./handlers/app'),
  apiHandlers = require('./handlers/api'),
  route = require('./route');

route(app, appHandlers);
route(api, apiHandlers);

app.use('/_api', api);

app.listen(8080, '0.0.0.0');

console.log('Listening on port 8080');