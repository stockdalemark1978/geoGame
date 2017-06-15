import gulp from 'gulp';
import connect from 'gulp-connect';
import browserify from 'browserify';
import watchify from 'watchify';
import stringify from 'stringify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import autoprefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import dotenv from 'gulp-dotenv';
import rename from 'gulp-rename';

const autoprefixerOptions = {
    browsers: [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
    ]
};

gulp.task('hello', () => {
    console.log('Hello World');
});

gulp.task('connect', () => {

    connect.server();
    // connect.server({
    //     root: '.',
    //     livereload: true
    // });
});

gulp.task('bundle', () => {
    let b = browserify({
        entries : ['./app/app.js'],
        cache : {},
        packageCache : {},
        plugin : watchify
    })
    .transform(stringify, {
        appliesTo : {
            includeExtensions : ['.html'],
            minify: true
        }

    })
    .transform(babelify, {
        presets : ['es2015']
    })

    b.on('update', bundle);
    bundle();

    function bundle()  {
        b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/js/'))
    }
})

gulp.task('sass', () => {
    console.log('Rebundling scss files...')
    return gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'))
});

//watch task

gulp.task('css', function () {
    gulp.watch('app/**/*.scss', ['sass']);
})

//Connects to server
gulp.task('connect', () => {
    connect.server();
});

//access env variables in .env file
gulp.task("dotenv", () => {
    return gulp.src(".env")
    .pipe(dotenv())
    .pipe(rename("env.json"))
    .pipe(gulp.dest("dist"))
})

gulp.task('default', ['connect', 'bundle', 'css', 'dotenv']);
