var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sassy = require('gulp-sass'),
    rename = require('gulp-rename');



gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname));
  app.listen(4000);
});


gulp.task('styles', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sassy({ style: 'expanded' }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'));
});



gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['express', 'watch'], function() {

});