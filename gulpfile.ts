const gulp         = require('gulp');
const tsc          = require('gulp-typescript');
const tslint       = require('gulp-tslint');
const sourcemaps   = require('gulp-sourcemaps');
const rename       = require('gulp-rename');
const concat       = require('gulp-concat');
const del          = require('del');
const sync         = require('gulp-sync')(gulp);
const tsProject    = tsc.createProject('tsconfig.json');

const srcDirectory    = './src/main/src';
const buildDirectory  = './src/main/webapp';
const targetDirectory = './target/shopsystem';


// Handle HTML files
gulp.task('html-index:dev', () => {
  return gulp.src(`${srcDirectory}/index-jit.jsp`)
    .pipe(rename('index.jsp'))
    .pipe(gulp.dest(`${buildDirectory}/WEB-INF/jsp/`));
});

gulp.task('html-index:prod', () => {
  return gulp.src(`${srcDirectory}/index-aot.jsp`)
    .pipe(rename('index.jsp'))
    .pipe(gulp.dest(`${buildDirectory}/WEB-INF/jsp/`));
});

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


// Copy required server files
gulp.task('web-inf', () => gulp.src(`${srcDirectory}/WEB-INF/**`, {base: srcDirectory})
  .pipe(gulp.dest(buildDirectory))
);


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


gulp.task('update:html', () => {
  return gulp.src(`${srcDirectory}/app/**/*.html`, {base: srcDirectory})
    .pipe(gulp.dest(targetDirectory));
});

gulp.task('update:css', () => {
  return gulp.src(`${srcDirectory}/**/*.css`)
    .pipe(gulp.dest(targetDirectory));
});

gulp.task('update:ts', ['ts'], () => {
  return gulp.src(`${buildDirectory}/**/*.js`)
    .pipe(gulp.dest(targetDirectory));
});

gulp.task('watch', () => {

  gulp.watch([`${srcDirectory}/**/*.html`], ['update:html']).on('change', e => {
    console.log(`HTML ${e.path.slice(e.path.indexOf('app'))} has been ${e.type}. Copying...`);
  });

  gulp.watch([`${srcDirectory}/**/*.css`], ['update:css']).on('change', e => {
    console.log(`CSS ${e.path.slice(e.path.indexOf('app'))} has been ${e.type}. Copying...`);
  });

  gulp.watch([`${srcDirectory}/**/*.ts`], ['update:ts']).on('change', e => {
    console.log(`TypeScript ${e.path.slice(e.path.indexOf('app'))} has been ${e.type}. Compiling...`);
  });

});

gulp.task('resources', ['css', 'images', 'web-inf', 'js:polyfills']);

gulp.task('build', ['resources', 'templates', 'ts', 'js:libs']);

gulp.task('build-dev',  sync.sync(['clean', 'html-index:dev', 'build']));

gulp.task('build-prod', sync.sync(['clean', 'html-index:prod', 'resources']));