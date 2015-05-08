var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');


    
gulp.task('testCommand', function() {
    return gulp.src('*.html')
    .pipe(notify({ message: 'test task complete' }));
});

gulp.task('sassLint', function() {
    gulp.src('sass/page.scss')
    .pipe(scssLint({
    'reporterOutput': 'scssReport.xml'
}))
    .pipe(notify({ message: 'sass linting pass its good to go' }))
});


gulp.task('grid', function() {
  return sass('grid/main.scss')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'grid compling complete' }));
});

gulp.task('page', function() {
  return sass('sass/page.scss')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'))
  .pipe(notify({ message: 'grid compling complete' }));
});



gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['page']);
  gulp.watch('grid/**/*.scss', ['grid']);
});


gulp.task('default', ['testCommand', 'watch']);