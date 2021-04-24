// gulpfile.js
const {
    watch,
    series,
    src,
    dest
} = require("gulp");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var replace = require("gulp-replace");
const imagemin = require("gulp-imagemin");
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
var tailwindcss = require('tailwindcss');

function fileIncludeTask(cb) {
    return src(['./src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
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
        .pipe(postcss([
            tailwindcss('./tailwind.config.js'),
            require('autoprefixer'),
            require('tailwindcss')
        ]))
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream());
    cb();
}

// Task for compiling our CSS files using PostCSS
function fontsTask(cb) {
    return src('./src/fonts/*')
        .pipe(gulp.dest('./public/fonts/'))
        .pipe(browserSync.stream());
    cb();
}

function phpTask(cb) {
    return src('./src/php/*')
        .pipe(gulp.dest('./public/php/'))
        .pipe(browserSync.stream());
    cb();
}

function nftTask(cb) {
    return src('./src/nft/*')
        .pipe(gulp.dest('./public/nft/'))
        .pipe(browserSync.stream());
    cb();
}

function phpInCommonTask(cb) {
    return src('./src/*.php')
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream());
    cb();
}

function jsTask(cb) {
    return src('./src/js/**/*')
        // .pipe(
        //     babel({
        //         presets: ["@babel/preset-env"]
        //     })
        // )
        // .pipe(uglify())
        // .pipe(concat("common.min.js"))
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.stream());
    cb();
}

// Task for minifying images
function imageminTask(cb) {
    return src("./src/images/**/*")
        .pipe(imagemin())
        .pipe(dest("./public/images/"));
    cb();
}

// Serve from browserSync server
function browsersyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: "./public/",
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
    watch("./src/**/*.html", series(fileIncludeTask, cssTask, browsersyncReload));
    watch(["./src/css/*.scss"], series(cssTask, browsersyncReload));
    watch(["./src/js/**/*.js"], series(jsTask, browsersyncReload));
    watch(["./src/images/**/*"], series(imageminTask, browsersyncReload));
    watch(["tailwind.config.js"], series(fileIncludeTask, cssTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(fileIncludeTask, cssTask, jsTask, imageminTask, fontsTask, phpTask, phpInCommonTask, nftTask, browsersyncServe, watchTask);
