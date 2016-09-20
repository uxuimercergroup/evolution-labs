// Require Gulp
var gulp = require('gulp');

// Require Gulp config
var config = require('../gulp.config')();

// Require Gulp Load Plugins plugin
var plugins = require('gulp-load-plugins')();

// Require Gulp Notify and Notifier
var notifier = require('node-notifier');

// Require Panini
var panini = require('panini');


// Compile page templates into finished HTML files
gulp.task('pages', function(){
  return gulp.src(config.src.pages)
  .pipe(plugins.newer({
    dest: config.global.dest,
    ext: '.html'
  }))
  .pipe(panini({
    root: config.panini.root,
    layouts: config.panini.layouts,
    partials: config.panini.partials,
    data: config.panini.data,
    helpers: config.panini.helpers
  }))
  .pipe(gulp.dest(config.global.dest));
});

gulp.task('pages:all', function(){
  panini.refresh();
  return gulp.src(config.src.pages)
  .pipe(panini({
    root: config.panini.root,
    layouts: config.panini.layouts,
    partials: config.panini.partials,
    data: config.panini.data,
    helpers: config.panini.helpers
  }))
  .pipe(gulp.dest(config.global.dest));
});

// Pages Notifier Task
gulp.task('pages:notify', function(){
  notifier.notify({
    title: config.notify.pages.title,
    message: config.notify.pages.message
  });
});