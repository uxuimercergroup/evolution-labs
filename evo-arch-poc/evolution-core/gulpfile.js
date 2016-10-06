var gulp      = require('gulp');                   // Require Gulp
    config    = require('./gulp.config')();        // Require Gulp config
    plugins   = require('gulp-load-plugins')();    // Require Gulp Load Plugins plugin
    sassLint  = require('gulp-sass-lint');         // Require Sass Lint
    rimraf    = require('rimraf');                 // Require Rimraf
    sequence  = require('run-sequence');           // Require Run Sequence

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done){
  rimraf(config.global.dest, done);
});

// Copy images to the "dist" folder
// In production, the images are optimized and compressed
gulp.task('images', function(){
  return gulp.src(config.src.images)
  .pipe(plugins.imagemin({progressive: true}))
  .pipe(gulp.dest(config.dest.images));
});

// Copy files out of the assets folder
// This task skips over the "images", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function(){
  return gulp.src(config.src.assets, {
    base: config.src.assets_base
  })
  .pipe(gulp.dest(config.dest.assets));
});

// Lint Sass
gulp.task('lint:sass', function() {
  return gulp.src(config.src.scss)
  .pipe(sassLint())
  .pipe(sassLint.format())
});

// Lints Sass files for formatting issues
gulp.task('lint', function(done){
  sequence(['lint:sass'], done);
});

// Build the "dist" folder by running all of the below tasks
gulp.task('default', function(done){
  sequence('clean', ['images', 'copy'], done);
});
