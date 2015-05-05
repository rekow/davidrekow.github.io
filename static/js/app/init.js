/**
 * @file Client app init.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

/**
 * @expose
 * @param {string} event
 * @param {Object} data
 */
window.track = function (event, data) {
  data = data || {};
  data.now = data.now || +(new Date());
  data.resource = data.resource || window.location.href;
  new Image().src = '/_api/track?event=' + encodeURIComponent(event) +
    '&data=' + encodeURIComponent(btoa(JSON.stringify(data)));
};
