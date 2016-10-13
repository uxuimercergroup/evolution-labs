var gulp     = require('gulp');					    // Require Gulp
    config   = require('../gulp.config')();	// Require Gulp config
    notifier = require('node-notifier');    // Require Gulp Notify and Notifier


// Copy files out of the assets folder
// This task skips over the "images", "js", and "scss" folders, which are parsed separately
gulp.task('copy:fonts', function(){
  return gulp.src(config.src.fonts)
  .pipe(gulp.dest(config.dest.fonts));
});

// Copy Notifier Task
gulp.task('copy:notify', function() {
  notifier.notify({
    title: config.notify.copy.title,
    message: config.notify.copy.message
  });
});

// Copy assets files
gulp.task('copy', function(done){
  sequence(['copy:fonts'], 'copy:notify', done);
});