/**
 * Handlebars Hyphenate string helper
 * @param {String} `str`
 * @example
 * {{hyphenate "foo bar baz qux"}}
 * @return {String}
 */
module.exports = function(str) {
  if (str && typeof str === 'string') {
    return str.split(' ').join('-');
  }
}
