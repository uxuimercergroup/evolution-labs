var gulp       = require('gulp');					// Require Gulp
	config     = require('../gulp.config')();		// Require Gulp config
	plugins    = require('gulp-load-plugins')();	// Require Gulp Load Plugins plugin
	browser    = require('browser-sync').create();	// Require Browser Sync
	notifier   = require('node-notifier');			// Require Gulp Notify and Notifier
	evoPkg     = require('../node_modules/evolution-core/package.json');        // Require package.json data
	pkg        = require('../package.json');		// Require package.json data
	replace    = require('gulp-replace-task');		// Require Replace Task
	argv       = require('yargs').argv;				// Require Yargs
	production = !!(argv.production);				// Check for --production flag


// Sass Task
gulp.task('sass', function(){
  return gulp.src(config.src.scss)
    .pipe(plugins.sourcemaps.init())
	.pipe(plugins.sass({
		includePaths: config.sass.include_paths,
		outputStyle: config.sass.output_style
	}).on('error', plugins.sass.logError))
	.pipe(plugins.autoprefixer({
		browsers: config.autoprefixer.browsers
	}))
	.pipe(replace({
		patterns: [
		  {
		    match: /{{ evo_meta_version }}/g,
		    replacement: evoPkg.version
		  },
		  {
		    match: /{{ evo_meta_author }}/g,
		    replacement: evoPkg.author
		  },
		  {
		    match: /{{ evo_meta_date }}/g,
		    replacement: evoPkg.date
		  },
		  {
		    match: /{{ evo_meta_url }}/g,
		    replacement: evoPkg.homepage
		  },
		  {
	        match: /{{ meta_project }}/g,
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