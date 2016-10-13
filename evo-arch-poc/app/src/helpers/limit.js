/**
 * Handlebars limit arrary helper that limits the number of items produced by a each loop.
 * @param {object} arr - name of the array.
 * @param {object} limit - amount of limit.
 * @param {object} options - Handlebars object.
 * @example
 * {{#each (limit global.items 5)}}{{this}}{{/each}}
 * @returns limits data to 5 items
 */
module.exports = function(arr, limit, options) {
  return arr.slice(0, limit);
}