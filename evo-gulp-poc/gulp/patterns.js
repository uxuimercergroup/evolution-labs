var gulp       = require('gulp');					// Require Gulp
	config     = require('../gulp.config')();		// Require Gulp config
	plugins    = require('gulp-load-plugins')();	// Require Gulp Load Plugins plugin
	browser    = require('browser-sync').create();	// Require Browser Sync
	notifier   = require('node-notifier');			// Require Gulp Notify and Notifier
	pkg        = require('../package.json');		// Require package.json data
	replace    = require('gulp-replace-task');		// Require Replace Task
	rimraf 	   = require('rimraf');					// Require Rimraf
	argv       = require('yargs').argv;				// Require Yargs
	production = !!(argv.production);				// Check for --production flag


// Patterns Clean Task
// Delete the "patterns" folder
// This happens every time patterns task is run
gulp.task('patterns:clean', function(done){
  rimraf(config.dest.patterns, done);
});

// Patterns HTML Task
gulp.task('patterns:html', function(){
	return gulp.src(config.src.patterns.html, {
		base: config.src.patterns_base
	})
	.pipe(plugins.newer({
		dest: config.dest.patterns,
		ext: '.html'
	}))
	.pipe(panini({
		root: config.panini.root,
		layouts: config.panini.layouts,
		partials: config.panini.partials,
		data: config.panini.data,
		helpers: config.panini.helpers
	}))
	.pipe(gulp.dest(config.dest.patterns));
});

// Patterns Sass Task
gulp.task('patterns:sass', function(){
	return gulp.src(config.src.patterns.scss, {
		base: config.src.patterns_base
	})
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.newer(config.dest.patterns))
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
	.pipe(plugins.if(!production, plugins.sourcemaps.write()))
	.pipe(gulp.dest(config.dest.patterns))
	.pipe(browser.reload({stream: true}));
});

// Patterns JS Task
gulp.task('patterns:js', function(){
  	return gulp.src(config.src.patterns.js, {
  		base: config.src.patterns_base
  	})
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.babel())
	.pipe(plugins.newer(config.dest.patterns))
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
  	.pipe(plugins.if(!production, plugins.sourcemaps.write()))
  	.pipe(gulp.dest(config.dest.patterns))
  	.on('finish', function() {
    	gulp.src(config.src.patterns.js)
    	.pipe(eslint({
      		useEslintrc: true,
      		configFile: '.eslintrc'
    	}))
    	.pipe(eslint.format())
  	});
});

// Patterns Notifier Task
gulp.task('patterns:notify', function() {
  notifier.notify({
    title: config.notify.patterns.title,
    message: config.notify.patterns.message
  });
});

// Package Patterns Task
gulp.task('patterns', function(done){
  sequence('patterns:clean', ['patterns:html', 'patterns:sass', 'patterns:js'], 'patterns:notify', done);
});
