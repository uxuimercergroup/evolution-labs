/**
 * Handlebars Add helper
 * @param {Number} `a`
 * @param {Number} `b`
 * @example
 * {{add @index 1}} : adds 1 to an array index so it start at 1, not 0
 * @returns The product of `a` plus `b`.
 */
module.exports = function(a, b) {
  return a + b;
}