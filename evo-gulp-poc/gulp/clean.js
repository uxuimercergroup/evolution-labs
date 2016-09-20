// Require Gulp
var gulp = require('gulp');

// Require Gulp config
var config = require('../gulp.config')();

// Require Rimraf
var rimraf = require('rimraf');


// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done){
  rimraf(config.global.dest, done);
});