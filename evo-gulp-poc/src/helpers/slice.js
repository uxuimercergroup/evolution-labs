/**
 * Handlebars iterate sliced helper that slices data into blocks.
 * @param {object} context
 * @param {object} block
 * @param {object} options - Handlebars object.
 * @example
 * {{#slice global.items offset="1" limit="5"}}{{this}}{{/slice}} : items 2 thru 6 
 * {{#slice global.items limit="10"}}{{this}}{{/slice}} : items 0 thru 9 
 * {{#slice global.items offset="3"}}{{this}}{{/slice}} : items 3 thru context.length 
 * @returns slices data into blocks
 */
module.exports = function(context, block, options) {
  var ret = "",
      offset = parseInt(block.hash.offset) || 0,
      limit = parseInt(block.hash.limit) || 5,
      i = (offset < context.length) ? offset : 0,
      j = ((limit + offset) < context.length) ? (limit + offset) : context.length;

  for(i,j; i<j; i++) {
    ret += block.fn(context[i]);
  }
  return ret;
}