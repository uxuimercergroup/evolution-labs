var lorem = require('handlebars-helper-lorem');

/**
 * Handlebars lorem ipsum helper that writes out sentences or words of lorem ipsum.
 * @param {object} options - Handlebars object.
 * @example
 * {{#lorem count="8"}}
 * @returns 8 sentences of lorem ipsum
 * @example
 * {{#lorem count="8" units="words"}}
 * @returns 8 words of lorem ipsum
 */
module.exports = function(options) {
  return lorem(options);
}
