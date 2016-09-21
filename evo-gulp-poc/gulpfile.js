var gulp       = require('gulp');                   // Require Gulp
    config     = require('./gulp.config')();        // Require Gulp config
    notify     = require("gulp-notify");            // Require Gulp Notify and Notifier
    notifier   = require('node-notifier');          // Require Gulp Notify and Notifier
    plugins    = require('gulp-load-plugins')();    // Require Gulp Load Plugins plugin
    browser    = require('browser-sync').create();  // Require Browser Sync
    sequence   = require('run-sequence');           // Require Run Sequence
    requireDir = require('require-dir');            // Require Require Dir
    argv       = require('yargs').argv;             // Require Yargs
    production = !!(argv.production);               // Check for --production flag


// Requires all tasks in the gulp directory
requireDir('./gulp');


// Reload the browser with BrowserSync
gulp.task('reload', function(done){
  browser.reload();
  done();
});

// Build the "dist" folder by running all of the below tasks
gulp.task('build', function(done){
  sequence('clean', ['pages', 'docs', 'sass', 'js:core', 'js:app', 'images', 'copy'], 'build:notify', done);
});

// Build Notifier Task
gulp.task('build:notify', function(){
  notifier.notify({
    title: config.notify.build.title,
    message: config.notify.build.message
  });
});

// Start a server with BrowserSync
gulp.task('server', ['build'], function(){
  browser.init({
    server: config.global.dest,
    port: config.browsersync.port
  });
});

// Server Notifier Task
gulp.task('server:notify', function(){
  notifier.notify({
    title: config.notify.server.title,
    message: config.notify.server.message
  });
});

// Watch Task
gulp.task('watch', function(){
  gulp.watch(config.src.pages, function(){sequence(['pages', 'docs'], 'reload', 'pages:notify')});
  gulp.watch(config.src.layouts, function(){sequence(['pages:all', 'docs:all'], 'reload', 'pages:notify')});
  gulp.watch(config.src.data, function(){sequence('pages:all', 'reload', 'pages:notify')});
  gulp.watch(config.src.docs, function(){sequence('docs', 'reload', 'pages:notify')});
  gulp.watch(config.src.scss, function(){sequence(['sass', 'docs:all'], 'reload', 'sass:notify')});
  gulp.watch(config.src.js, function(){sequence(['js:core', 'js:app', 'docs:all'], 'reload', 'js:notify')});
  gulp.watch(config.src.images, function(){sequence(['images'], 'reload', 'images:notify')});
  gulp.watch(config.src.assets, function(){sequence(['copy'], 'copy:notify')});
});

// Default Task
gulp.task('default', function(done){
	sequence('server', 'server:notify', 'watch', done);
});