// Require Gulp Load Plugins plugin
var plugins = require('gulp-load-plugins')();

// Require Yargs
var argv = require('yargs').argv;

// Require Browser Sync
var browser = require('browser-sync').create();

// Require Concat Util
var concat = require('gulp-concat-util');

// Require Gulp
var gulp = require('gulp');

// Require Panini
var panini = require('panini');

// Require Rimraf
var rimraf = require('rimraf');

// Require Run Sequence
var sequence = require('run-sequence');

// Require YAML
var yaml = require('js-yaml');

// Require Node FS
var fs = require('fs');

// Require Supercollider
var supercollider = require('supercollider');

// Supercollider Config
supercollider
  .config({
    template: 'src/pages/doc.html',
    handlebars: require('./src/helpers/handlebars.js'),
  })
  .adapter('sass')
  .adapter('js');

// Load all Gulp plugins into one variable
var $ = plugins;

// Check for --production flag
var PRODUCTION = !!(argv.production);

// Load settings from config.yml
var config = loadConfig();

var COMPATIBILITY = config.COMPATIBILITY;
var PORT = config.PORT;
var UNCSS_OPTIONS = config.UNCSS_OPTIONS;
var PATHS = config.PATHS;

function loadConfig() {
  var ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf(PATHS.dist, done);
});

// Copy files out of the assets folder
// This task skips over the "images", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function() {
  return gulp.src(PATHS.assets, {
    base: PATHS.assets_base
  })
  .pipe(gulp.dest(PATHS.dist + '/assets'));
});

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  return gulp.src('src/pages/**/*.html')
  .pipe(panini({
    root: 'src/pages/',
    layouts: 'src/layouts/',
    partials: 'src/partials/',
    data: 'src/data/',
    helpers: 'src/helpers/'
  }))
  .pipe(gulp.dest(PATHS.dist));
});

// Load updated HTML templates and partials into Panini
gulp.task('pages:reset', function(done) {
  panini.refresh();
  done();
});

// Copy docs into finished HTML files
gulp.task('docs', function() {
  panini.refresh();

  return gulp.src('src/content/**/*')
  .pipe(supercollider.init())
  .pipe(panini({
    root: 'src/pages/',
    layouts: 'src/layouts/',
    partials: 'src/partials/',
    data: 'src/data/',
    helpers: 'src/helpers/'
  }))
  .pipe(gulp.dest(PATHS.dist + '/docs'));
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {
  return gulp.src(['src/assets/scss/**/*.scss'])
  .pipe($.sourcemaps.init())
  .pipe($.sass()
    .on('error', $.sass.logError))
  .pipe($.autoprefixer({
    browsers: COMPATIBILITY
  }))
  // Comment in the pipe below to run UnCSS in production
  //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
  .pipe($.if(PRODUCTION, $.cssnano()))
  .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
  .pipe(gulp.dest(PATHS.dist + '/assets/css'))
  .pipe(browser.reload({ stream: true }));
});

// Combine Core JavaScript into one file
// In production, the file is minified
gulp.task('javascript:core', function() {
  return gulp.src(PATHS.javascript_core)
  .pipe($.sourcemaps.init())
  .pipe($.babel())
  .pipe(concat('evolution.js'))
  .pipe($.if(PRODUCTION, $.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
  .pipe(gulp.dest(PATHS.dist + '/assets/js'));
});

// Combine Application JavaScript into one file
// In production, the file is minified
gulp.task('javascript:app', function() {
  return gulp.src(PATHS.javascript_app)
  .pipe($.sourcemaps.init())
  .pipe($.babel())
  .pipe(concat('app.js'))
  .pipe($.if(PRODUCTION, $.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
  .pipe(gulp.dest(PATHS.dist + '/assets/js'));
});

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  return gulp.src('src/assets/images/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets/images'));
});

// Build the "dist" folder by running all of the below tasks
gulp.task('build', function(done) {
  sequence('clean', ['pages', 'docs', 'sass', 'javascript:core', 'javascript:app', 'images', 'copy'], done);
});

// Start a server with BrowserSync
gulp.task('server', ['build'], function() {
  browser.init({
    server: PATHS.dist, port: PORT
  });
});

// Reload the browser with BrowserSync
gulp.task('reload', function(done) {
  browser.reload();
  done();
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(PATHS.assets, function(){sequence('copy')});
  gulp.watch(['src/pages/**/*.html'], function(){sequence('pages', 'reload')});
  gulp.watch(['src/content/**/*.md'], function(){sequence('docs', 'reload')});
  gulp.watch(['src/{layouts,partials}/**/*.hbs'], function(){sequence('pages:reset', 'pages', 'docs', 'reload')});
  gulp.watch(['src/data/**/*.{json,yml}'], function(){sequence('pages:reset', 'pages', 'reload')});
  gulp.watch(['src/assets/scss/**/*.scss'], function(){sequence('sass', 'docs', 'reload')});
  gulp.watch(['src/assets/js/**/*.js'], function(){sequence('javascript:core', 'javascript:app', 'docs', 'reload')}); 
  gulp.watch(['src/assets/images/**/*'], function(){sequence('images', 'reload')});
});