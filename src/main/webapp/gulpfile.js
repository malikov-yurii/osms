var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sysBuilder = require('systemjs-builder');


// Production
gulp.task('bundle-polly:prod', function () {
  return gulp.src([
      '../../node_modules/core-js/client/shim.min.js',
      '../../node_modules/zone.js/dist/zone.js',
      '../../node_modules/reflect-metadata/Reflect.js',
      '../../node_modules/systemjs/dist/system.src.js',
      'systemjs.config.prod.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/lib'));
});

gulp.task('bundle:js', function () {
  var builder = new sysBuilder('', './systemjs.config.prod.js');
  return builder.buildStatic('app', 'public/dist/app.min.js');
});

gulp.task('minify:js', ['bundle:js'], function () {
  gulp.src('public/dist/app.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/'));
});

// Developer version
gulp.task('bundle-polly:dev', function () {
  return gulp.src([
      '../../node_modules/core-js/client/shim.min.js',
      '../../node_modules/zone.js/dist/zone.js',
      '../../node_modules/reflect-metadata/Reflect.js',
      '../../node_modules/systemjs/dist/system.src.js',
      'systemjs.config.dev.js'
    ])
    .pipe(concat('vendors.dev.js'))
    .pipe(gulp.dest('public/lib'));
});

gulp.task('copy-libs', function () {
  return gulp.src([
      '@angular/**/bundles/**',
      'rxjs/**/*.js'
    ], {cwd: '../../node_modules/**'})
    .pipe(gulp.dest('vendor'));
});

gulp.task('prod', ['bundle-polly:prod', 'bundle:js', 'minify:js']);

gulp.task('dev', ['bundle-polly:dev', 'copy-libs']);