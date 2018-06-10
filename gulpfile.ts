const gulp         = require('gulp');
const tsc          = require('gulp-typescript');
const tslint       = require('gulp-tslint');
const sourcemaps   = require('gulp-sourcemaps');
const rename       = require('gulp-rename');
const concat       = require('gulp-concat');
const del          = require('del');
const sync         = require('gulp-sync')(gulp);
const tsProject    = tsc.createProject('tsconfig.json');

const srcDirectory    = './ui/src';
const buildDirectory  = './build/ui';


gulp.task('templates', () => {
  return gulp.src(`${srcDirectory}/app/**/*.html`, {base: srcDirectory})
    .pipe(gulp.dest(buildDirectory));
});


// Copy CSS files
gulp.task('css', () => {
  return gulp.src(`${srcDirectory}/**/*.css`)
    .pipe(gulp.dest(buildDirectory));
});


// Copy images
gulp.task('images', () => {
  return gulp.src(`${srcDirectory}/assets/images/**/*`, {base: srcDirectory})
    .pipe(gulp.dest(buildDirectory));
});

// Handle TypeScript files
// Lint
gulp.task('tslint', () => {
  return gulp.src(`${srcDirectory}/app/**/*.ts`)
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

// Transpile
gulp.task('ts', () => {
  return gulp.src([
    `${srcDirectory}/app/**/*.ts`,
    `!${srcDirectory}/app/boot.ts`
    ])
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${buildDirectory}/app`));
});

// Copy required core libraries
gulp.task('js:libs', () => {
  return gulp.src(
      [
        '@angular/**/bundles/**',
        'rxjs/**/*.js'
      ],
      {
        cwd: 'node_modules/**'
      }
    )
    .pipe(gulp.dest(`${buildDirectory}/app/vendor`));
});

// Bundle polyfills
gulp.task('js:polyfills', () => {
  return gulp.src([
      './node_modules/core-js/client/shim.min.js',
      './node_modules/zone.js/dist/zone.js',
      './node_modules/reflect-metadata/Reflect.js',
      './node_modules/systemjs/dist/system.src.js'
    ])
    .pipe(concat('polyfills.js'))
    .pipe(gulp.dest(buildDirectory));
});


gulp.task('clean', () => del(buildDirectory));

gulp.task('resources', ['css', 'images', 'js:polyfills']);

gulp.task('build', ['resources', 'templates', 'ts', 'js:libs']);

gulp.task('build-dev',  sync.sync(['clean', 'build']));

gulp.task('build-prod', sync.sync(['clean', 'resources']));