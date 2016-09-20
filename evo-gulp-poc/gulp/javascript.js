// Require Gulp
var gulp = require('gulp');

// Require Gulp config
var config = require('../gulp.config')();

// Require Gulp Load Plugins plugin
var plugins = require('gulp-load-plugins')();

// Require Browser Sync
var browser = require('browser-sync').create();

// Require Concat Util
var concat = require('gulp-concat-util');

// Require Gulp Notify and Notifier
var notifier = require('node-notifier');

// Require package.json data
var pkg = require('../package.json');

// Require Replace Task
var replace = require('gulp-replace-task');

// Require Yargs
var argv = require('yargs').argv;

// Check for --production flag
var production = !!(argv.production);


// Combine Core JavaScript into one file
// In production, the file is minified
gulp.task('js:core', function(){
  return gulp.src(config.src.js_core)
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.if(production, plugins.babel()))
  .pipe(plugins.newer(config.dest.js))
  .pipe(concat.scripts(pkg.name + '.js'))
  .pipe(concat.header(
    '/**\n' +
    ' * Mercer Evolution v' + pkg.version + ' - Core JS\n' +
    ' * DATE: ' + pkg.date + '\n' +
    ' * AUTHOR: ' + pkg.author + '\n' +
    ' * URL: ' + pkg.homepage + '\n' +
    ' */\n\n'
  ))
  .pipe(plugins.if(production, plugins.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe(plugins.if(!production, plugins.sourcemaps.write()))
  .pipe(gulp.dest(config.dest.js));
});

// Combine Application JavaScript into one file
// In production, the file is minified
gulp.task('js:app', function(){
  return gulp.src(config.src.js_app)
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.babel())
  .pipe(plugins.newer(config.dest.js))
  .pipe(concat.scripts('app.js'))
  .pipe(plugins.if(production, plugins.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe(plugins.if(!production, plugins.sourcemaps.write()))
  .pipe(gulp.dest(config.dest.js));
});

// Javascript Notifier Task
gulp.task('js:notify', function(){
  notifier.notify({
    title: config.notify.js.title,
    message: config.notify.js.message
  });
});