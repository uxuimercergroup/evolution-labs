var gulp       = require('gulp');                   // Require Gulp
    config     = require('../gulp.config')();       // Require Gulp config
    plugins    = require('gulp-load-plugins')();    // Require Gulp Load Plugins plugin
    browser    = require('browser-sync').create();  // Require Browser Sync
    concat     = require('gulp-concat-util');       // Require Concat Util
    notifier   = require('node-notifier');          // Require Gulp Notify and Notifier
    evoPkg     = require('../node_modules/evolution-core/package.json');        // Require package.json data
    pkg        = require('../package.json');        // Require package.json data
    replace    = require('gulp-replace-task');      // Require Replace Task
    argv       = require('yargs').argv;             // Require Yargs
    production = !!(argv.production);               // Check for --production flag


// Combine Core JavaScript into one file
// In production, the file is minified
gulp.task('js:core', function(){
  return gulp.src(config.src.js_core)
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.if(production, plugins.babel()))
  .pipe(plugins.newer(config.dest.js))
  .pipe(concat(evoPkg.name + '.js'))
  .pipe(concat.header(
    '/**\n' +
    ' * Mercer Evolution v' + evoPkg.version + ' - Core JS\n' +
    ' * DATE: ' + evoPkg.date + '\n' +
    ' * AUTHOR: ' + evoPkg.author + '\n' +
    ' * URL: ' + evoPkg.homepage + '\n' +
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
//  .pipe(plugins.babel()) /* Turned off babel because it was in conflict with typeahead.js */
  .pipe(plugins.newer(config.dest.js))
  .pipe(concat('app.js'))
  .pipe(replace({
    patterns: [
      {
        match: /{{ meta_name }}/g,
        replacement: pkg.name
      },
      {
        match: /{{ meta_version }}/g,
        replacement: pkg.version
      },
      {
        match: /{{ meta_author }}/g,
        replacement: pkg.author
      },
      {
        match: /{{ meta_date }}/g,
        replacement: pkg.date
      },
      {
        match: /{{ meta_url }}/g,
        replacement: pkg.homepage
      }
    ]
  }))
  .pipe(plugins.if(production, plugins.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe(plugins.if(!production, plugins.sourcemaps.write()))
  .pipe(gulp.dest(config.dest.js))
  .on('finish', function() {
    gulp.src(config.src.js_app)
    .pipe(eslint({
      useEslintrc: true,
      configFile: '.eslintrc'
    }))
    .pipe(eslint.format())
  });
});

// Javascript Notifier Task
gulp.task('js:notify', function(){
  notifier.notify({
    title: config.notify.js.title,
    message: config.notify.js.message
  });
});