var fs         = require('fs');
var handlebars = require('handlebars');
var path       = require('path');

var PARTIALS = ['conversational-form'];

for (var i in PARTIALS) {
  handlebars.registerPartial(PARTIALS[i], fs.readFileSync(path.join(__dirname, '../src/pages/patterns/organisms/conversational-form/'+PARTIALS[i]+'.html')).toString());
}