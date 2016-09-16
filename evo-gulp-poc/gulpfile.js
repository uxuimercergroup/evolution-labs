// Require package.json data
var pkg = require('./package.json');

// Require Gulp Load Plugins plugin
var plugins = require('gulp-load-plugins')();

// Require Yargs
var argv = require('yargs').argv;

// Require Browser Sync
var browser = require('browser-sync').create();

// Require Gulp
var gulp = require('gulp');

// Require Concat Util
var concat = require('gulp-concat-util');

// Require Replace Task
var replace = require('gulp-replace-task');

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

// Require Foundation Docs
var foundationDocs = require('foundation-docs');

// Require Supercollider
var supercollider = require('supercollider');

// Require SFTP
var sftp = require('gulp-sftp');

// Require Notify and Notifier
var notify = require("gulp-notify");
var notifier = require('node-notifier');

// Supercollider Config
supercollider
  .config({
    template: foundationDocs.componentTemplate,
    marked: foundationDocs.marked,
    handlebars: foundationDocs.handlebars
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
var DEPLOY_OPTIONS = config.DEPLOY_OPTIONS;

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
    helpers: ['src/helpers/', foundationDocs.handlebarsHelpers]
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
  .pipe(replace({
    patterns: [
      {
        match: /{{ evo_meta_version }}/g,
        replacement: pkg.version
      },
      {
        match: /{{ evo_meta_author }}/g,
        replacement: pkg.author
      },
      {
        match: /{{ evo_meta_date }}/g,
        replacement: pkg.date
      },
      {
        match: /{{ evo_meta_url }}/g,
        replacement: pkg.homepage
      }
    ]
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
  .pipe(concat.scripts(pkg.name + '.js'))
  .pipe(concat.header(
    '/**\n' +
    ' * Mercer Evolution v' + pkg.version + ' - Core JS\n' +
    ' * DATE: ' + pkg.date + '\n' +
    ' * AUTHOR: ' + pkg.author + '\n' +
    ' * URL: ' + pkg.homepage + '\n' +
    ' */\n\n'
  ))
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
  .pipe(concat.scripts('app.js'))
  .pipe($.if(PRODUCTION, $.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
  .pipe(gulp.dest(PATHS.dist + '/assets/js'));
});

// Copy images to the "dist" folder
// In production, the images are optimized and compressed
gulp.task('images', function() {
  return gulp.src('src/assets/images/**/*')
  .pipe($.if(PRODUCTION, $.imagemin({
    progressive: true
  })))
  .pipe(gulp.dest(PATHS.dist + '/assets/images'));
});

// Copy Notifier Task
gulp.task('copy:notify', function() {
  notifier.notify({
    title: 'Files copied.',
    message: 'Files copied successfully.'
  });
});

// Sass Notifier Task
gulp.task('sass:notify', function() {
  notifier.notify({
    title: 'Sass files preprocessed.',
    message: 'Sass files preprocessed successfully.'
  });
});

// Javascript Notifier Task
gulp.task('javascript:notify', function() {
  notifier.notify({
    title: 'Scripts generated.',
    message: 'Scripts generated successfully.'
  });
});

// Pages Notifier Task
gulp.task('pages:notify', function() {
  notifier.notify({
    title: 'Pages assembled.',
    message: 'Layouts, templates, partials, and data assembled successfully.'
  });
});

// Images Notifier Task
gulp.task('images:notify', function() {
  notifier.notify({
    title: "Images optimized and copied.",
    message: "Images optimized and copied successfully."
  });
});

// Build Notifier Task
gulp.task('build:notify', function() {
  notifier.notify({
    title: 'Build done.',
    message: 'Files generated successfully.'
  });
});

// Deploy Notifier Task
gulp.task('deploy:notify', function() {
  notifier.notify({
    title: 'Production files deployed.',
    message: 'Production files deployed to FTP server successfully.'
  });
});

// Server Notifier Task
gulp.task('server:notify', function() {
  notifier.notify({
    title: 'Build done. Server running.',
    message: 'Build successful. Server is ready and running.'
  });
});

// Reload the browser with BrowserSync
gulp.task('reload', function(done) {
  browser.reload();
  done();
});

// Build the "dist" folder by running all of the below tasks
gulp.task('build', function(done) {
  sequence('clean', ['pages', 'docs', 'sass', 'javascript:core', 'javascript:app', 'images', 'copy'], 'build:notify', done);
});

// Build the "dist" folder and provide settings for deploy
gulp.task('build:deploy', ['build'], function() {
  return gulp.src(PATHS.dist + '/**/*')
  .pipe(sftp({
    auth: DEPLOY_OPTIONS.auth,
    host: DEPLOY_OPTIONS.host,
    remotePath: DEPLOY_OPTIONS.remote_path
  }));
});

// Deploy the site to SFTP
gulp.task('deploy', function(done) {
  sequence('build:deploy', 'deploy:notify', done);
});

// Start a server with BrowserSync
gulp.task('server', ['build'], function() {
  browser.init({
    server: PATHS.dist,
    port: PORT
  });
});

// Build the site, run the server, and watch for file changes
gulp.task('default', function(done) {
  sequence('server', 'server:notify', done);

  // Watches
  gulp.watch(PATHS.assets, function(){sequence(['copy'], 'copy:notify')});
  gulp.watch(['src/pages/**/*.html'], function(){sequence(['pages', 'docs'], 'reload', 'pages:notify')});
  gulp.watch(['src/content/**/*.md'], function(){sequence('docs', 'reload', 'pages:notify')});
  gulp.watch(['src/{layouts,partials}/**/*.hbs'], function(){sequence('pages:reset', ['pages', 'docs'], 'reload', 'pages:notify')});
  gulp.watch(['src/data/**/*.{json,yml}'], function(){sequence('pages:reset', 'pages', 'reload', 'pages:notify')});
  gulp.watch(['src/assets/scss/**/*.scss'], function(){sequence(['sass', 'docs'], 'reload', 'sass:notify')});
  gulp.watch(['src/assets/js/**/*.js'], function(){sequence(['javascript:core', 'javascript:app', 'docs'], 'reload', 'javascript:notify')}); 
  gulp.watch(['src/assets/images/**/*'], function(){sequence('images', 'images:notify', 'reload')});
});