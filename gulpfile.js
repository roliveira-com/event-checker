var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  compass = require('gulp-compass');

gulp.task('js', function() {
  gulp.src('./builds/js/**/*');
});

gulp.task('html', function() {
  gulp.src('./builds/*.html');
});

gulp.task('css', function() {
  gulp.src('.builds/css/sass/style.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'builds/css',
      sass: 'builds/css/sass'
    }))
    .pipe(gulp.dest('builds/css'));
  });

gulp.task('watch', function() {
  gulp.watch('./builds/js/**/*', ['js']);
  gulp.watch('./builds/css/sass/**/*.scss', ['css']);
  gulp.watch(['./builds/*.html',
    './builds/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('./builds/')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 3000
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
