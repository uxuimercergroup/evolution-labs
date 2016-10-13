/**
 * Handlebars Lowercase string helper
 * @param {String} `str`
 * @example
 * {{lowercase "Foo BAR baZ"}}
 * @return {String}
 */
module.exports = function(str) {
  if (str && typeof str === 'string') {
    return str.toLowerCase();
  }
}
