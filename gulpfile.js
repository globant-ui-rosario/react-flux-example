var gulp = require('gulp');
var del = require('del');
var run = require('run-sequence');
var sass = require('gulp-sass');
var browserify = require('browserify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var handlebars = require('gulp-compile-handlebars');

gulp.task('clean', function (cb) {
    del(['build/**'], cb);
});

gulp.task('sass', function () {
    var bundle = gulp.src('sass/main.scss').pipe(sass()).on('error', function (error) {
        console.log(error);
        this.emit('end');
    });

    return bundle.pipe(concat('style.css')).pipe(gulp.dest('build/css/'));
});

gulp.task('js', function () {
    var bundle = browserify('index.js').transform(reactify).bundle().on('error', function () {
        console.log(error);
        this.emit('end');
    });

    return bundle.pipe(source('app.js')).pipe(gulp.dest('build/js'));
});

gulp.task('html', function () {
    var bundle = gulp.src('html/index.html').pipe(handlebars()).on('error', function (error) {
        console.log(error);
        this.emit('end');
    });

    return bundle.pipe(gulp.dest('build/'));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'build/'
        },
        port: '8080'
    });

    gulp.watch([
        'components/**/*.js',
        'views/**/*.js'
    ], ['js', browserSync.reload]);
    gulp.watch([
        'html/**/*.html'
    ], ['html', browserSync.reload]);
    gulp.watch([
        'components/**/*.scss',
        'views/**/*.scss',
        'sass/**/*.scss'
    ], ['sass', browserSync.reload]);
});

gulp.task('default', function (cb) {
    run('html', 'sass', 'js', 'browser-sync', cb);
});