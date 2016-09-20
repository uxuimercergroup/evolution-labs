// Require Gulp
var gulp = require('gulp');

// Require Gulp config
var config = require('../gulp.config')();

// Require Gulp Load Plugins plugin
var plugins = require('gulp-load-plugins')();

// Require Foundation Docs
var foundationDocs = require('foundation-docs');

// Require Supercollider
var supercollider = require('supercollider');

// Require Panini
var panini = require('panini');


// Supercollider Config
supercollider
  .config({
    template: foundationDocs.componentTemplate,
    marked: foundationDocs.marked,
    handlebars: foundationDocs.handlebars
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
    helpers: [config.panini.helpers, foundationDocs.handlebarsHelpers]
  }))
  .pipe(gulp.dest(config.dest.docs));
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
    helpers: [config.panini.helpers, foundationDocs.handlebarsHelpers]
  }))
  .pipe(gulp.dest(config.dest.docs));
});