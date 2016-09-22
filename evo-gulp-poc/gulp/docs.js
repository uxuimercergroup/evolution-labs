var gulp           = require('gulp');                 // Require Gulp
    config         = require('../gulp.config')();     // Require Gulp config
    plugins        = require('gulp-load-plugins')();  // Require Gulp Load Plugins plugin
    cacheBust      = require('gulp-cache-bust');      // Require Cache Bust
    foundationDocs = require('foundation-docs');      // Require Foundation Docs
    supercollider  = require('supercollider');        // Require Supercollider
    panini         = require('panini');               // Require Panini


// Supercollider Config
supercollider
  .config({
    template: 'src/pages/doc.hbs',
    marked: foundationDocs.marked,
    handlebars: foundationDocs.handlebars,
    keepFm: true
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
  .pipe(cacheBust())
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
    helpers: config.panini.helpers
  }))
  .pipe(cacheBust())
  .pipe(gulp.dest(config.dest.docs));
});