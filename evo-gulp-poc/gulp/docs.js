var gulp           = require('gulp');                 // Require Gulp
    config         = require('../gulp.config')();     // Require Gulp config
    plugins        = require('gulp-load-plugins')();  // Require Gulp Load Plugins plugin
    cacheBust      = require('gulp-cache-bust');      // Require Cache Bust
    foundationDocs = require('foundation-docs');      // Require Foundation Docs
    supercollider  = require('supercollider');        // Require Supercollider
    panini         = require('panini');               // Require Panini
    argv           = require('yargs').argv;           // Require Yargs
    production     = !!(argv.production);             // Check for --production flag

// Search
var search_sort_order = [
  'page',
  'component',
  'sass variable',
  'sass mixin',
  'sass function',
  'js class',
  'js function',
  'js plugin option',
  'js event'
];

var search_pages_types = {
  'library': function(item) {
    return !!(item.library);
  }
}

function buildSearch() {
  supercollider.buildSearch('dist/data/search.json', function() {});
}

// Supercollider Config
supercollider
  .config({
    template: 'src/pages/doc-template.html',
    marked: foundationDocs.marked,
    handlebars: foundationDocs.handlebars,
    keepFm: true,
    silent: false,
    pageRoot: config.src.pages_base
  })
  .searchConfig({
    extra: 'src/data/search.yml',
    sort: search_sort_order,
    pageTypes: search_pages_types
  })
  .adapter('sass')
  .adapter('js');

// Copy docs into finished HTML files
gulp.task('docs', function() {
  panini.refresh();
  return gulp.src(config.src.docs, {
    base: config.src.pages_base
  })
  .pipe(supercollider.init())
  .pipe(panini({
    root: config.panini.root,
    layouts: config.panini.layouts,
    partials: config.panini.partials,
    data: config.panini.data,
    helpers: config.panini.helpers
  }))
  .pipe(plugins.if(production, cacheBust()))
  .pipe(gulp.dest(config.global.dest))
  .on('finish', buildSearch);
});