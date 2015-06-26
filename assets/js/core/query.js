/**
 * @file Core document querying.
 * @author <a href="http://davidrekow.com">David Rekow</a>.
 * @copyright 2015
 */

goog.provide('$');

var $, _match;

/**
 * Queries an element or the document for a selector.
 * @param {!string} selector
 * @param {Element=} parent
 * @return {?(Element|Array.<Element>)}
 */
$ = function (selector, parent) {
  var results, _results;

  parent = parent || document;

  if (selector.charAt(0) === '#') {
    return parent.querySelector(selector);
  }

  results = [];
  _results = parent.querySelectorAll(selector);

  for (var i = 0; i < _results.length; results.push(_results[i++]));

  return results;
};

/**
 * Cached version of vendor-specific element match.
 * @this {Element}
 * @param {string=} selector
 * @return {boolean}
 */
_match = Element.prototype.matches ||
  Element.prototype.webkitMatchesSelector ||
  Element.prototype.mozMatchesSelector ||
  Element.prototype.msMatchesSelector ||
  Element.prototype.oMatchesSelector ||
  function (selector) {
    var matches = document.querySelectorAll(selector);

    for (var i = 0; i < matches.length; i++) {
      if (matches[i] === this) {
        return true;
      }
    }

    return false;
  };

/**
 * Accepts an element and selector and returns whether the selector matches the element.
 * @static
 * @param {!Element} element
 * @param {string=} selector
 * @return {boolean}
 */
$.matches = function (element, selector) {
  return _match.call(element, selector);
};
