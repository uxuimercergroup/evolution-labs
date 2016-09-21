var moment = require('helper-moment');

/**
 * Handlebars helper for formatting dates with moment.js.
 * https://github.com/helpers/helper-moment
 * http://momentjs.com/
 * @param {object} options - Handlebars object.
 * @example
 * {{moment "YYYY"}}
 * @returns Current year in 4 digit format
 */
module.exports = function(options) {
  return moment(options);
}
