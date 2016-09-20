// Require Gulp
var gulp = require('gulp');

// Require Gulp config
var config = require('../gulp.config')();

// Require Gulp Notify and Notifier
var notifier = require('node-notifier');

// Require Gulp Load Plugins plugin
var plugins = require('gulp-load-plugins')();

// Require Run Sequence
var sequence = require('run-sequence');


// Build the "dist" folder and provide settings for deploy
gulp.task('build:deploy', ['build'], function() {
  return gulp.src(config.deploy.src)
  .pipe(plugins.sftp({
    auth: config.deploy.auth,
    host: config.deploy.host,
    remotePath: config.deploy.remote_path
  }));
});

// Deploy Notifier Task
gulp.task('deploy:notify', function() {
  notifier.notify({
    title: config.notify.deploy.title,
    message: config.notify.deploy.message
  });
});

// Deploy the site to SFTP
gulp.task('deploy', function(done) {
  sequence('build:deploy', 'deploy:notify', done);
});