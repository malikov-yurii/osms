var gulp = require('gulp');
var SystemBuilder = require('gulp-systemjs-builder');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sysBuilder = require('systemjs-builder');

gulp.task('bundle-prod:libs', function() {
   return gulp.src([
           'node_modules/core-js/client/shim.min.js',
           'node_modules/zone.js/dist/zone.js',
           'node_modules/reflect-metadata/Reflect.js',
           'node_modules/systemjs/dist/system.src.js',
           'systemjs.config.prod.js'
       ])
       .pipe(concat('vendors.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('public/lib'));
});

gulp.task('bundle-dev:libs', function() {
  return gulp.src([
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js',
      'systemjs.config.dev.js'
    ])
    .pipe(concat('vendors.dev.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/lib'));
});

gulp.task('bundle:js', function() {
   var builder = new sysBuilder('', './systemjs.config.dev.js');
   return builder.buildStatic('app', 'public/dist/app.min.js');
});

gulp.task('minify:js', function() {
  gulp.src('public/dist/app.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/'));
});