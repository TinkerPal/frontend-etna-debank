// gulpfile.js
const { watch, series, src, dest } = require('gulp');
var browserSync = require('browser-sync').create();

const postcss = require('gulp-postcss'),
  uglify = require('gulp-uglify'),
  htmlreplace = require('gulp-html-replace'),
  hash = require('gulp-hash-filename'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass'),
  tap = require('gulp-tap'),
  imagemin = require('gulp-imagemin'),
  fileinclude = require('gulp-file-include'),
  gulp = require('gulp'),
  minifyCSS = require('gulp-minify-css'),
  env = require('gulp-env'),
  tailwindcss = require('tailwindcss'),
  fs = require('fs'),
  replace = require('gulp-replace'),
  autoprefixer = require('gulp-autoprefixer'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename'),
  htmlmin = require('gulp-htmlmin'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber');

var hashedJS;
var hashedCSS;
var noop = function() {};
const js = [
  './src/js/utils.js',
  './src/js/constants/env.js',
  './src/js/constants/constant.js',
  './src/js/constants/token.js',
  './src/js/components/userObject.js',
  './src/js/components/customSelect.js',
  './src/js/components/modal.js',
  './src/js/staticData/parseNotifData.js',
  './src/js/common.js',
  './src/js/custom.js',
];

function foo(folder, enconding) {
  return new Promise(function(resolve, reject) {
    fs.readdir(folder, enconding, function(err, filenames) {
      if (err) reject(err);
      else resolve(filenames);
    });
  });
}

const getCssPath = async () => {
  var cssPath;
  try {
    await foo('./public/css/').then(
      (files) =>
        (cssPath = '/css/' + files.filter((el) => /\.min.css$/.test(el)))
    );
  } catch (error) {
    cssPath;
  }
  return cssPath;
};

const getJsPath = async () => {
  var jsPath;
  await foo('./public/js/').then(
    (files) => (jsPath = '/js/' + files.filter((el) => /\.min.js$/.test(el)))
  );
  return jsPath;
};

function jsTask(envs) {
  return src(js)
    .pipe(plumber())
    .pipe(env({ vars: { NODE_ENV: envs } }))
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [ '@babel/preset-env' ],
        plugins: [ 'transform-inline-environment-variables' ],
      })
    )
    .pipe(envs === 'production' ? uglify() : tap(noop))
    .pipe(concat('common.js'))
    .pipe(
      hash({
        format: '{name}-{hash:8}{ext}',
      })
    )
    .pipe(
      rename(function(path) {
        path.basename += '.min';
        hashedJS = '/js/' + path.basename + '.js';
      })
    )
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(copyLibs())
    .pipe(browserSync.stream());
}

function htmlTask() {
  return src([ './src/*.html' ])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      htmlreplace({
        css: hashedCSS ? hashedCSS : getCssPath(),
        js: hashedJS ? hashedJS : getJsPath(),
      })
    )
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
}

// Task for compiling our CSS files using PostCSS
function cssTask() {
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
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(
      hash({
        format: '{name}-{hash:8}{ext}',
      })
    )
    .pipe(
      rename(function(path) {
        path.basename += '.min';
        hashedCSS = '/css/' + path.basename + '.css';
      })
    )
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
}

// Task for compiling our CSS files using PostCSS
function fontsTask() {
  return src('./src/fonts/*')
    .pipe(gulp.dest('./public/fonts/'))
    .pipe(browserSync.stream());
}

function copyStatic() {
  return src('./static/**/*')
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
}

function copyLibs() {
  return src('./src/js/libs/*.js')
    .pipe(gulp.dest('./public/js/libs/'))
    .pipe(browserSync.stream());
}

// Task for minifying images
function imageminTask() {
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

// Чистим директорию назначения и делаем ребилд, чтобы удаленные из проекта файлы не остались
function cleanOldCss() {
  return gulp
    .src([ './public/css' ], { read: false, allowEmpty: true })
    .pipe(clean());
}

function cleanOldJs() {
  return gulp
    .src([ './public/js' ], { read: false, allowEmpty: true })
    .pipe(clean());
}

// Watch Files & Reload browser after tasks
function watchTask(envs) {
  watch(
    './src/**/*.html',
    series(htmlTask, cleanOldCss, cssTask, htmlTask, browsersyncReload)
  );
  watch(
    [ './src/css/*.scss' ],
    series(htmlTask, cleanOldCss, cssTask, htmlTask, browsersyncReload)
  );
  watch(
    [ './src/js/**/*.js' ],
    series(cleanOldJs, () => jsTask(envs), htmlTask, browsersyncReload)
  );
  watch([ './src/images/**/*' ], series(imageminTask, browsersyncReload));
  watch(
    [ 'tailwind.config.js' ],
    series(htmlTask, cleanOldCss, cssTask, htmlTask, browsersyncReload)
  );
}

function build(envs) {
  return series(
    cleanOldCss,
    cleanOldJs,
    cssTask,
    () => jsTask(envs),
    htmlTask,
    cssTask,
    htmlTask,
    imageminTask,
    fontsTask,
    copyStatic
  );
}

// Default Gulp Task
exports.default = series(build('development'), browsersyncServe, () =>
  watchTask('development')
);

exports.prod = series(build('production'), browsersyncServe, () =>
  watchTask('production')
);

exports.build = series(build('development'));

exports.build_prod = series(build('production'));
