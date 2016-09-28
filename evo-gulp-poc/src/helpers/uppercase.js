/**
 * Handlebars Uppercase string and block helper
 * @param {String} `str` The string to uppercase
 * @param {Object} `options` Handlebars options object
 * @return {String}
 * @block
 * @example
 * {{uppercase "foo bar baz"}}
 */
module.exports = function(str, options) {
  if (str && typeof str === 'string') {
    return str.toUpperCase();
  } else {
    options = str;
  }
  if (typeof options === 'object' && options.fn) {
    return options.fn(this).toUpperCase();
  }
  return '';
}