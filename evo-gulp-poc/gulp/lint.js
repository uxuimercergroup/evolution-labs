var gulp       = require('gulp');               // Require Gulp
    sassLint   = require('gulp-sass-lint');     // Require Sass Lint
    eslint 	   = require('gulp-eslint');        // Require ESlint
    notifier   = require('node-notifier');      // Require Gulp Notify and Notifier
    sequence   = require('run-sequence');       // Require Run Sequence


// Lints Sass and JavaScript files for formatting issues
gulp.task('lint', function(done){
  sequence(['lint:sass', 'lint:javascript'], 'lint:notify', done);
});

gulp.task('lint:sass', function() {
  return gulp.src(config.src.scss)
  .pipe(sassLint())
  .pipe(sassLint.format())
});

gulp.task('lint:javascript', function () {
  return gulp.src(config.src.js)
  .pipe(eslint({
  	useEslintrc: true,
  	configFile: '.eslintrc'
  }))
  .pipe(eslint.format())
});

// Lint Notifier Task
gulp.task('lint:notify', function(){
  notifier.notify({
    title: config.notify.lint.title,
    message: config.notify.lint.message
  });
});