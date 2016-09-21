// Require Gulp
var gulp = require('gulp');
	config = require('../gulp.config')();		// Require Gulp config
	plugins = require('gulp-load-plugins')();	// Require Gulp Load Plugins plugin
	browser = require('browser-sync').create();	// Require Browser Sync
	notifier = require('node-notifier');		// Require Gulp Notify and Notifier
	pkg = require('../package.json');			// Require package.json data
	replace = require('gulp-replace-task');		// Require Replace Task
	argv = require('yargs').argv;				// Require Yargs
	production = !!(argv.production);			// Check for --production flag


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