var gulp = require('gulp');					// Require Gulp
	config = require('../gulp.config')();	// Require Gulp config
	rimraf = require('rimraf');				// Require Rimraf


// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done){
  rimraf(config.global.dest, done);
});