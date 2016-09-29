var gulp       = require('gulp');                   // Require Gulp
    config     = require('../gulp.config')();       // Require Gulp config
    plugins    = require('gulp-load-plugins')();    // Require Gulp Load Plugins plugin
    browser    = require('browser-sync').create();  // Require Browser Sync
    concat     = require('gulp-concat-util');       // Require Concat Util
    notifier   = require('node-notifier');          // Require Gulp Notify and Notifier
    pkg        = require('../package.json');        // Require package.json data
    replace    = require('gulp-replace-task');      // Require Replace Task
    argv       = require('yargs').argv;             // Require Yargs
    production = !!(argv.production);               // Check for --production flag


// Combine Core JavaScript into one file
// In production, the file is minified
gulp.task('js:core', function(){
  return gulp.src(config.src.js_core)
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.if(production, plugins.babel()))
  .pipe(plugins.newer(config.dest.js))
  .pipe(concat(pkg.name + '.js'))
  .pipe(concat.header(
    '/**\n' +
    ' * Mercer Evolution v' + pkg.version + ' - Core JS\n' +
    ' * DATE: ' + pkg.date + '\n' +
    ' * AUTHOR: ' + pkg.author + '\n' +
    ' * URL: ' + pkg.homepage + '\n' +
    ' */\n\n'
  ))
  .pipe(plugins.if(production, plugins.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe(plugins.if(!production, plugins.sourcemaps.write()))
  .pipe(gulp.dest(config.dest.js));
});

// Combine Core Animation JavaScript into one file
// In production, the file is minified
gulp.task('js:core_animation', function(){
  return gulp.src(config.src.js_core_animation)
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.if(production, plugins.babel()))
  .pipe(plugins.newer(config.dest.js))
  .pipe(concat(pkg.name + '-animations.js'))
  .pipe(concat.header(
    '/**\n' +
    ' * Mercer Evolution v' + pkg.version + ' - Animation JS\n' +
    ' * DATE: ' + pkg.date + '\n' +
    ' * AUTHOR: ' + pkg.author + '\n' +
    ' * URL: ' + pkg.homepage + '\n' +
    ' */\n\n'
  ))
  .pipe(plugins.if(production, plugins.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe(plugins.if(!production, plugins.sourcemaps.write()))
  .pipe(gulp.dest(config.dest.js));
});

// Combine Application JavaScript into one file
// In production, the file is minified
gulp.task('js:app', function(){
  return gulp.src(config.src.js_app)
  .pipe(plugins.sourcemaps.init())
//  .pipe(plugins.babel())
  .pipe(plugins.newer(config.dest.js))
  .pipe(concat('app.js'))
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
  .pipe(plugins.if(production, plugins.uglify()
    .on('error', e => { console.log(e); })
  ))
  .pipe(plugins.if(!production, plugins.sourcemaps.write()))
  .pipe(gulp.dest(config.dest.js))
  .on('finish', function() {
    gulp.src(config.src.js_app)
    .pipe(eslint({
      useEslintrc: true,
      configFile: '.eslintrc'
    }))
    .pipe(eslint.format())
  });
});

// Javascript Notifier Task
gulp.task('js:notify', function(){
  notifier.notify({
    title: config.notify.js.title,
    message: config.notify.js.message
  });
});