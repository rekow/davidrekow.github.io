/**
 * @file Core document querying.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

goog.provide('$');

var $ = function (selector, parent) {
  parent = parent || document;

  if (selector.charAt(0) === '#')
}