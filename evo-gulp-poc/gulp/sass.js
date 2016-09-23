var gulp       = require('gulp');					// Require Gulp
	config     = require('../gulp.config')();		// Require Gulp config
	plugins    = require('gulp-load-plugins')();	// Require Gulp Load Plugins plugin
	browser    = require('browser-sync').create();	// Require Browser Sync
	notifier   = require('node-notifier');			// Require Gulp Notify and Notifier
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
		  },
		  {
	        match: /{{ meta_project }}/g,
	        replacement: pkg.project.name
	      },
	      {
	        match: /{{ meta_version }}/g,
	        replacement: pkg.project.version
	      },
	      {
	        match: /{{ meta_author }}/g,
	        replacement: pkg.project.author
	      },
	      {
	        match: /{{ meta_date }}/g,
	        replacement: pkg.project.date
	      },
	      {
	        match: /{{ meta_url }}/g,
	        replacement: pkg.project.homepage
	      },
	      {
	        match: /{{ conversational_form_meta_name }}/g,
	        replacement: pkg.organisms.conversational_form.name
	      },
	      {
	        match: /{{ conversational_form_meta_version }}/g,
	        replacement: pkg.organisms.conversational_form.version
	      },
	      {
	        match: /{{ conversational_form_meta_date }}/g,
	        replacement: pkg.organisms.conversational_form.date
	      },
	      {
	        match: /{{ fat_footer_meta_name }}/g,
	        replacement: pkg.organisms.fat_footer.name
	      },
	      {
	        match: /{{ fat_footer_meta_version }}/g,
	        replacement: pkg.organisms.fat_footer.version
	      },
	      {
	        match: /{{ fat_footer_meta_date }}/g,
	        replacement: pkg.organisms.fat_footer.date
	      },
	      {
	        match: /{{ item_selection_panel_meta_name }}/g,
	        replacement: pkg.organisms.item_selection_panel.name
	      },
	      {
	        match: /{{ item_selection_panel_meta_version }}/g,
	        replacement: pkg.organisms.item_selection_panel.version
	      },
	      {
	        match: /{{ item_selection_panel_meta_date }}/g,
	        replacement: pkg.organisms.item_selection_panel.date
	      },
	      {
	        match: /{{ pricing_table_meta_name }}/g,
	        replacement: pkg.organisms.pricing_table.name
	      },
	      {
	        match: /{{ pricing_table_meta_version }}/g,
	        replacement: pkg.organisms.pricing_table.version
	      },
	      {
	        match: /{{ pricing_table_meta_date }}/g,
	        replacement: pkg.organisms.pricing_table.date
	      },
	      {
	        match: /{{ showcase_panel_meta_name }}/g,
	        replacement: pkg.organisms.showcase_panel.name
	      },
	      {
	        match: /{{ showcase_panel_meta_version }}/g,
	        replacement: pkg.organisms.showcase_panel.version
	      },
	      {
	        match: /{{ showcase_panel_meta_date }}/g,
	        replacement: pkg.organisms.showcase_panel.date
	      },
	      {
	        match: /{{ social_media_badges_meta_name }}/g,
	        replacement: pkg.organisms.social_media_badges.name
	      },
	      {
	        match: /{{ social_media_badges_meta_version }}/g,
	        replacement: pkg.organisms.social_media_badges.version
	      },
	      {
	        match: /{{ social_media_badges_meta_date }}/g,
	        replacement: pkg.organisms.social_media_badges.date
	      },
	      {
	        match: /{{ stepper_meta_name }}/g,
	        replacement: pkg.organisms.stepper.name
	      },
	      {
	        match: /{{ stepper_meta_version }}/g,
	        replacement: pkg.organisms.stepper.version
	      },
	      {
	        match: /{{ stepper_meta_date }}/g,
	        replacement: pkg.organisms.stepper.date
	      },
	      {
	        match: /{{ thin_footer_meta_name }}/g,
	        replacement: pkg.organisms.thin_footer.name
	      },
	      {
	        match: /{{ thin_footer_meta_version }}/g,
	        replacement: pkg.organisms.thin_footer.version
	      },
	      {
	        match: /{{ thin_footer_meta_date }}/g,
	        replacement: pkg.organisms.thin_footer.date
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