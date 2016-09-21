var gulp     = require('gulp');					    // Require Gulp
    config   = require('../gulp.config')();	// Require Gulp config
    notifier = require('node-notifier');    // Require Gulp Notify and Notifier


// Copy files out of the assets folder
// This task skips over the "images", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function(){
  return gulp.src(config.src.assets, {
    base: config.src.assets_base
  })
  .pipe(gulp.dest(config.dest.assets));
});

// Copy Notifier Task
gulp.task('copy:notify', function() {
  notifier.notify({
    title: config.notify.copy.title,
    message: config.notify.copy.message
  });
});