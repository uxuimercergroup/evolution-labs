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
var SEARCH_SORT_ORDER = [
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

var SEARCH_PAGE_TYPES = {
  'library': function(item) {
    return !!(item.library);
  }
}

// Supercollider Config
supercollider
  .config({
    template: 'src/pages/doc-template.html',
    marked: foundationDocs.marked,
    handlebars: foundationDocs.handlebars,
    keepFm: true
  })
  .searchConfig({
    extra: 'src/data/search.yml',
    sort: SEARCH_SORT_ORDER,
    pageTypes: SEARCH_PAGE_TYPES
  })
  .adapter('sass')
  .adapter('js');

// Copy docs into finished HTML files
gulp.task('docs', function() {
  return gulp.src(config.src.docs)
  .pipe(plugins.newer({
    dest: config.dest.docs,
    ext: '.html'
  }))
  .pipe(supercollider.init())
  .pipe(panini({
    root: config.panini.root,
    layouts: config.panini.layouts,
    partials: config.panini.partials,
    data: config.panini.data,
    helpers: config.panini.helpers
  }))
  .pipe(plugins.if(production, cacheBust()))
  .pipe(gulp.dest(config.dest.docs))
  .on('finish', buildSearch);
});

gulp.task('docs:all', function() {
  panini.refresh();
  return gulp.src(config.src.docs)
  .pipe(supercollider.init())
  .pipe(panini({
    root: config.panini.root,
    layouts: config.panini.layouts,
    partials: config.panini.partials,
    data: config.panini.data,
    helpers: config.panini.helpers
  }))
  .pipe(plugins.if(production, cacheBust()))
  .pipe(gulp.dest(config.dest.docs))
  .on('finish', buildSearch);
});

function buildSearch() {
  supercollider.buildSearch('dist/data/search.json', function() {});
}