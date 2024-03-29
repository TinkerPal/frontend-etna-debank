// gulpfile.js
const { watch, series, src, dest } = require('gulp');
var browserSync = require('browser-sync').create();
var through2 = require('through2');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const webpack = require('webpack');
const postcss = require('gulp-postcss'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  fileinclude = require('gulp-file-include'),
  gulp = require('gulp'),
  minifyCSS = require('gulp-minify-css'),
  env = require('gulp-env'),
  tailwindcss = require('tailwindcss'),
  replace = require('gulp-replace'),
  autoprefixer = require('gulp-autoprefixer'),
  clean = require('gulp-clean'),
  htmlmin = require('gulp-htmlmin'),
  concat = require('gulp-concat'),
  webpackStream = require('webpack-stream'),
  plumber = require('gulp-plumber');

const js = ['./src/js/index.js'];

const getWebpackConfig = (envs, buildType) => ({
  optimization: {
    minimize: false,
  },
  entry: ['./src/js/index.js'],
  output: {
    filename: 'common.js',
  },
  mode: envs,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-transform-destructuring',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-transform-modules-amd',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-json-strings',
                '@babel/plugin-proposal-export-namespace-from',
                '@babel/plugin-proposal-numeric-separator',
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.SITE_VERSION': JSON.stringify(buildType),
    }),
    new NodePolyfillPlugin(),
  ],
});

function createEmptyStream() {
  var pass = through2.obj();
  process.nextTick(pass.end.bind(pass));
  return pass;
}

function jsTask(envs, buildType) {
  const config = getWebpackConfig(envs, buildType);
  return src(js)
    .pipe(plumber())
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest('./public/js/'))
    .pipe(copyLibs())
    .pipe(browserSync.stream());
}

function htmlTask() {
  return src(['./src/*.html', '!./src/mobile.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(
      replace('?timestamp', function () {
        const timestamp = Date.now();
        return `?${timestamp}`;
      })
    )
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
}

function htmlMobile() {
  return src(['./src/*.html', '!./src/index.html', '!./src/mobile.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(
      replace('?timestamp', function () {
        const timestamp = Date.now();
        return `?${timestamp}`;
      })
    )
    .pipe(gulp.dest('./public/'));
}

function renameMobileHtml() {
  return src('./src/mobile.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(concat('index.html'))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(
      replace('?timestamp', function () {
        const timestamp = Date.now();
        return `?${timestamp}`;
      })
    )
    .pipe(gulp.dest('./public/'));
}

// Task for compiling our CSS files using PostCSS
function cssTask() {
  return src(['./src/css/styles.scss', './src/css/common.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(replace('hover: ', 'hover:'))
    .pipe(replace('focus: ', 'focus:'))
    .pipe(replace('disabled: ', 'disabled:'))
    .pipe(replace('xl: ', 'xl:'))
    .pipe(replace('lg: ', 'lg:'))
    .pipe(replace('md: ', 'md:'))
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
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
}

function cssTaskMobile() {
  return src(['./src/css/mobile.scss', './src/css/common.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(replace('hover: ', 'hover:'))
    .pipe(replace('focus: ', 'focus:'))
    .pipe(replace('disabled: ', 'disabled:'))
    .pipe(replace('xl: ', 'xl:'))
    .pipe(replace('lg: ', 'lg:'))
    .pipe(replace('md: ', 'md:'))
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
    .pipe(concat('mobile.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
}

function cssLibsTask() {
  return src('./src/css/libs/*')
    .pipe(gulp.dest('./public/css/libs/'))
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
    .src(['./public/css'], {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
}

function cleanOldJs() {
  return gulp
    .src(['./public/js'], {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
}

// Watch Files & Reload browser after tasks
function watchTask(envs, buildType = 'desktop') {
  watch(
    './src/**/*.html',
    series(
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      cleanOldCss,
      cssTask,
      cssTaskMobile,
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      cssLibsTask,
      browsersyncReload
    )
  );
  watch(
    ['./src/css/**/*'],
    series(
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      cleanOldCss,
      cssTask,
      cssTaskMobile,
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      cssLibsTask,
      browsersyncReload
    )
  );
  watch(
    ['./src/js/**/*.js'],
    series(
      cleanOldJs,
      () => jsTask(envs, buildType),
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      browsersyncReload
    )
  );
  watch(['./src/images/**/*'], series(imageminTask, browsersyncReload));
  watch(
    ['tailwind.config.js'],
    series(
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      cleanOldCss,
      cssTask,
      cssTaskMobile,
      buildType === 'desktop' ? htmlTask : htmlMobile,
      buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
      browsersyncReload
    )
  );
  watch(['./static/**/*'], series(copyStatic, browsersyncReload));
}

function build(envs, buildType = 'desktop') {
  return series(
    cleanOldCss,
    cleanOldJs,
    cssTask,
    cssTaskMobile,
    () => jsTask(envs, buildType),
    buildType === 'desktop' ? htmlTask : htmlMobile,
    buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
    cssTask,
    cssTaskMobile,
    buildType === 'desktop' ? htmlTask : htmlMobile,
    buildType === 'mobile' ? renameMobileHtml : createEmptyStream,
    imageminTask,
    cssLibsTask,
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

exports.mobile = series(build('development', 'mobile'), browsersyncServe, () =>
  watchTask('development', 'mobile')
);

exports.mobile_prod = series(
  build('production', 'mobile'),
  browsersyncServe,
  () => watchTask('production', 'mobile')
);

exports.build = series(build('development'));

exports.build_prod = series(build('production'));

exports.build_mobile = series(build('development', 'mobile'));
exports.build_prod_mobile = series(build('production', 'mobile'));
