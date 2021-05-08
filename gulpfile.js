// gulpfile.js
const { watch, series, src, dest } = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const env = require('gulp-env');
var tailwindcss = require('tailwindcss');

function fileIncludeTask(cb) {
  return src([ './src/*.html' ])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
  cb();
}

// Task for compiling our CSS files using PostCSS
function cssTask(cb) {
  return src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(replace('hover: ', 'hover:'))
    .pipe(replace('focus: ', 'focus:'))
    .pipe(replace('disabled: ', 'disabled:'))
    .pipe(
      postcss([
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
        require('tailwindcss'),
      ])
    )
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
}

// Task for compiling our CSS files using PostCSS
function fontsTask(cb) {
  return src('./src/fonts/*')
    .pipe(gulp.dest('./public/fonts/'))
    .pipe(browserSync.stream());
}

function copyStatic(cb) {
  return src('./static/**/*')
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
}

function jsEnvTask(cb) {
  return src('./src/js/constants/env.js')
    .pipe(env({ vars: { NODE_ENV: 'development' } }))
    .pipe(
      babel({
        plugins: [ 'transform-inline-environment-variables' ],
      })
    )
    .pipe(gulp.dest('./public/js/constants'))
    .pipe(browserSync.stream());
}

function jsEnvProdTask(cb) {
  return src('./src/js/constants/env.js')
    .pipe(env({ vars: { NODE_ENV: 'production' } }))
    .pipe(
      babel({
        plugins: [ 'transform-inline-environment-variables' ],
      })
    )
    .pipe(gulp.dest('./public/js/constants'))
    .pipe(browserSync.stream());
}

function jsTask(cb) {
  return src('./src/js/**/*')
    .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.stream());
}

// Task for minifying images
function imageminTask(cb) {
  return src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(dest('./public/images/'));
}

// Serve from browserSync server
function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: './public/',
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Files & Reload browser after tasks
function watchTask() {
  watch('./src/**/*.html', series(fileIncludeTask, cssTask, browsersyncReload));
  watch([ './src/css/*.scss' ], series(cssTask, browsersyncReload));
  watch([ './src/js/**/*.js' ], series(jsTask, jsEnvTask, browsersyncReload));
  watch([ './src/images/**/*' ], series(imageminTask, browsersyncReload));
  watch(
    [ 'tailwind.config.js' ],
    series(fileIncludeTask, cssTask, browsersyncReload)
  );
}

function watchTask_prod() {
  watch('./src/**/*.html', series(fileIncludeTask, cssTask, browsersyncReload));
  watch([ './src/css/*.scss' ], series(cssTask, browsersyncReload));
  watch([ './src/js/**/*.js' ], series(jsTask, jsEnvProdTask, browsersyncReload));
  watch([ './src/images/**/*' ], series(imageminTask, browsersyncReload));
  watch(
    [ 'tailwind.config.js' ],
    series(fileIncludeTask, cssTask, browsersyncReload)
  );
}


// Default Gulp Task
exports.default = series(
  fileIncludeTask,
  cssTask,
  jsTask,
  jsEnvTask,
  imageminTask,
  fontsTask,
  copyStatic,
  browsersyncServe,
  watchTask
);

exports.watch_prod = series(
  fileIncludeTask,
  cssTask,
  jsTask,
  jsEnvProdTask,
  imageminTask,
  fontsTask,
  copyStatic,
  browsersyncServe,
  watchTask_prod
);

exports.build = series(
  fileIncludeTask,
  cssTask,
  jsTask,
  jsEnvTask,
  imageminTask,
  fontsTask,
  copyStatic
);

exports.build_prod = series(
  fileIncludeTask,
  cssTask,
  jsTask,
  jsEnvProdTask,
  imageminTask,
  fontsTask,
  copyStatic
);
