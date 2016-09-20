// Require Gulp
var gulp = require('gulp');

// Require Gulp config
var config = require('../gulp.config')();

// Require Gulp Load Plugins plugin
var plugins = require('gulp-load-plugins')();

// Require Browser Sync
var browser = require('browser-sync').create();

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


// Sass Task
gulp.task('sass', function(){
  return gulp.src(config.src.scss)
    .pipe(plugins.sourcemaps.init())
	.pipe(plugins.sass()
		.on('error', plugins.sass.logError))
	.pipe(plugins.autoprefixer({
		browsers: config.autoprefixer.browsers
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
	//.pipe(plugins.if(production, plugins.uncss({
	//	html: config.uncss.html,
	//	ignore: config.uncss.ignore
	// })))
	.pipe(plugins.if(production, plugins.cssnano()))
	.pipe(plugins.if(!production, plugins.sourcemaps.write()))
    .pipe(gulp.dest(config.dest.css))
    .pipe(browser.reload({stream: true}));
});

// Sass Notifier Task
gulp.task('sass:notify', function(){
  notifier.notify({
    title: config.notify.sass.title,
    message: config.notify.sass.message
  });
});